const publicRouter = require('express').Router();
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkSchem... Remove this comment to see the full error message
const { checkSchema, validationResult, matchedData } = require('express-validator');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validation... Remove this comment to see the full error message
const validation = require('./validation');
import { Ticket } from '../../../models/Ticket';
import { Category } from '../../../models/Category';
import { Area } from '../../../models/Area';
import { Locale } from '../../..//models/Locale';
import handleError from '../../../middleware/HandleError';
// @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
const moment = require('moment'); // require

// Submit a ticket
publicRouter.post('/tickets', checkSchema(validation.addTicket), async (req: any, res: any) => {
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

publicRouter.get('/options', async (req: any, res: any) => {
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
        prefix: process.env.PHONE_PREFIX,
        minLength: process.env.PHONE_MINLENGTH,
        maxLength: process.env.PHONE_MAXLENGTH,
      },
    };
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

publicRouter.get('/locales', async (req: any, res: any) => {
  try {
    const result = await new Locale().list('active');
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = publicRouter;
