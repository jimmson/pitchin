// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'settings'.
const settings = require('express').Router();
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkSchem... Remove this comment to see the full error message
const { checkSchema, validationResult, matchedData } = require('express-validator');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validation... Remove this comment to see the full error message
const validation = require('./validation');
import Config from '../../../models/Config';
import handleError from '../../../middleware/HandleError';

settings.get('/', async (req: any, res: any) => {
  try {
    const config = await new Config().get(null, true);
    delete config.zelos.tokens;
    delete config.zelos.password;
    res.send(config);
  } catch (err) {
    handleError(err, res);
  }
});

settings.get('/:category', async (req: any, res: any) => {
  if (validation.hasOwnProperty(req.params.category)) {
    try {
      let config = await new Config().get(req.params.category, true);
      config = config.toObject();
      delete config.tokens;
      delete config.password;
      res.send(config);
    } catch (err) {
      handleError(err, res);
    }
  } else {
    res.status('404').send('No such category');
  }
});

// I don't know how to pass request params to checkschema so I could do checkSchema(validation[category]) and avoid having multiple endpoints

settings.put('/workspace', async (req: any, res: any) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({
  //         errors: errors.array(),
  //     });
  // }
  try {
    const result = await new Config().update('workspace', req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

settings.put('/zelos', async (req: any, res: any) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({
  //         errors: errors.array(),
  //     });
  // }
  try {
    const result = await new Config().update('zelos', req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

settings.put('/sms', async (req: any, res: any) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({
  //         errors: errors.array(),
  //     });
  // }
  try {
    const result = await new Config().update('sms', req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = settings;
