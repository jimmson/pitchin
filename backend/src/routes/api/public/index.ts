import { Container } from 'typedi';
import express from 'express';
import { checkSchema, validationResult, matchedData } from 'express-validator';
import validation from './validation';
import { Ticket } from '../../../models/Ticket';
import { Category } from '../../../models/Category';
import { Area } from '../../../models/Area';
import { Locale } from '../../..//models/Locale';
import handleError from '../../../middleware/HandleError';
import moment from 'moment';
import OpenWeatherMap from '../../../services/openweather';
import { ITicket } from '../../../interfaces/ITicket';
import { IDaily } from '../../../interfaces/IOpenWeatherMap';
import config from '../../../config';
import Organisation from '../../../services/organisation';

const router = express.Router();

// Submit a ticket
router.post('/tickets', checkSchema(validation.addTicket), async (req: any, res: any) => {
  // check for validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  // create a ticket
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
  const ticket = new Ticket();
  const data = matchedData(req);
  if (data.hasDate) {
    let st = moment(data.startTime);
    let et = moment(data.endTime);
    data.startDate = moment(data.date).startOf('day').add(st.hours(), 'h').add(st.minutes(), 'm').toDate();
    data.endDate = moment(data.date).startOf('day').add(et.hours(), 'h').add(et.minutes(), 'm').toDate();
  }
  try {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const id = await ticket.add({
      ...data,
    });
    res.status(201).send({
      message: 'ok',
      id: id,
    });
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/options', async (req: any, res: any) => {
  try {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const category = new Category();
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const area = new Area();
    const allCategories = await category.list('public');
    const allAreas = await area.list('public');
    const result = {
      status: 'ok',
      categories: allCategories,
      areas: allAreas,
      phone: {
        prefix: '27',
        minLength: 6,
        maxLength: 16,
      },
    };
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/locales', async (req: any, res: any) => {
  try {
    const result = await new Locale().list('active');
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/tickets', async (req: any, res: any) => {
  // const dateFormat = 'ddd, [The] Do [of] MMM YYYY';
  const dateFormat = 'ddd Do MMM YYYY';
  const timeFormat = 'k:mm';

  try {
    const ticket = new Ticket();
    const data = await ticket.list({
      $or: [
        {
          $and: [
            {
              startDate: {
                $gte: moment().endOf('day').toDate(),
              },
            },
            {
              startDate: {
                $lte: moment().endOf('day').add(1, 'months').toDate(),
              },
            },
          ],
        },
        // Show all day when we can disable
        // { startDate: { $exists: false } },
      ],
    });
    const tickets = data.tickets;

    const organisationService: Organisation = Container.get('organisation');
    const organisations = await organisationService.list();

    const weatherService: OpenWeatherMap = Container.get('openweathermap');

    let dayMap = tickets.reduce((resultDayMap, currentTicket: ITicket) => {
      let s = moment(currentTicket.startDate || null);
      let e = moment(currentTicket.endDate);
      let c = 0;
      let k = s.isValid() ? s.format('YYMMDD') : 'all';

      let ticket = {
        name: currentTicket.name,
        imageURL: currentTicket.imageURL,
        organisation: organisations.find((o) => o._id?.toString() == currentTicket.organisation)?.name,
        description: currentTicket.request,
        participants: `${c}/${currentTicket.maxParticipants}`,
        address: currentTicket.address,
        time: s.isValid()
          ? `${s.format(dateFormat)} from ${s.format(timeFormat)} to ${e.format(timeFormat)}`
          : undefined,
      };

      if (resultDayMap[k]) {
        resultDayMap[k].tickets.push(ticket);
        return resultDayMap;
      }

      let day = {
        date: s.isValid() ? s.format(dateFormat) : undefined,
        tickets: [ticket],
      };

      let dayForcast: IDaily = weatherService.weatherData().daily.find((d) => {
        return moment.unix(d.dt).isSame(s, 'day');
      });
      if (dayForcast) {
        day.weather = {
          icon: dayForcast.weather[0].id,
          description: dayForcast.weather[0].main,
          min: Math.round(dayForcast.temp.min),
          max: Math.round(dayForcast.temp.max),
        };
      }

      resultDayMap[k] = day;

      return resultDayMap;
    }, {});

    let result = [];
    Object.keys(dayMap)
      .sort()
      .forEach(function (key) {
        result.push(dayMap[key]);
      });

    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
