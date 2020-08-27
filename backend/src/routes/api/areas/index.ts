// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'areas'.
const areas = require('express').Router();
import { checkSchema, validationResult } from 'express-validator';
import validation from './validation';
import handleError from '../../../middleware/HandleError';
import { Area } from '../../../models/Area';

areas.post('/', checkSchema(validation.newArea), async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const area = new Area();
    const response = await area.add(req.body);
    res.status(201).send(response);
  } catch (err) {
    handleError(err, res);
  }
});
areas.get('/', async (req: any, res: any) => {
  try {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const area = new Area();
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const list = await area.list();
    res.send(list);
  } catch (err) {
    handleError(err, res);
  }
});

areas.get('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const area = new Area(req.params.id);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    result = await area.get();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});
areas.put('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const area = new Area(req.params.id);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    result = await area.update(req.body);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});
areas.delete('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const area = new Area(req.params.id);
    const result = await area.delete();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = areas;
