import { Container } from 'typedi';
import log from '../loaders/logger';
import Zelos from '../services/zelos';
import agenda from 'agenda';
import { Ticket } from '../models/Ticket';
import Organisation from '../services/organisation';
import moment from 'moment';
import axios from 'axios';
import aws from 'aws-sdk';
import stream from 'stream';
import config from '../config';

// TODO: Error handling.
export default async function (job: agenda.Job, done: (e?: Error) => void): Promise<void> {
  log.info(`running zelos task sync job`);

  const zelos: Zelos = Container.get('zelos');

  try {
    for await (const task of zelos.streamTasks()) {
      const ticket = new Ticket();

      const result = await ticket.getByField({ externalID: task.id });
      if (result) {
        log.info(`task ${task.id} already exists`);
        continue;
      }

      let [organisation, name] = task.name.split('-');
      if (!name) {
        [organisation, name] = [name, organisation];
      }

      let id;
      if (organisation) {
        const organisationService: Organisation = Container.get('organisation');
        id = await organisationService.findOrCreate(organisation.trim());
      }

      const source = task.images?.[0]?.data?.source;

      let location;
      if (source) {
        location = await uploadFile(source, task.id);
      }

      let res = {
        name: name.trim(),
        address: task?.location?.address,
        request: task.description,
        imageURL: location,
        maxParticipants: task.max_participants_amount,
        createdAt: Date.now(),
        organisation: id,
        startDate: task.execution_start_date ? moment(task.execution_start_date).toDate() : undefined,
        endDate: task.execution_end_date ? moment(task.execution_end_date).toDate() : undefined,
        externalID: task.id,
      };

      await ticket.add(res, undefined);
    }
  } catch (err) {
    log.error(err);
  }

  done();
}

async function uploadFile(source: string, name: string) {
  let s3 = new aws.S3({
    endpoint: config.spaces.endpoint,
    accessKeyId: config.spaces.key,
    secretAccessKey: config.spaces.secret,
  });

  let res = await axios.get(source, {
    responseType: 'stream',
  });

  const contentType = res.headers['content-type'];
  const [type, ext] = contentType.split('/');

  if (type !== 'image') {
    return;
  }

  const pass = new stream.PassThrough();
  res.data.pipe(pass);

  const s3Response = await s3
    .upload({
      Body: pass,
      Bucket: config.spaces.bucket,
      Key: `${config.env}/images/${name}.${ext}`,
      ContentType: contentType,
      ACL: 'public-read',
    })
    .promise();

  return s3Response.Location;
}
