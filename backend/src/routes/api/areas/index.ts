import express from 'express';
import { checkSchema, validationResult } from 'express-validator';
import validation from './validation';
import handleError from '../../../middleware/HandleError';
import { Area } from '../../../models/Area';

const router = express.Router();

router.post('/', checkSchema(validation.newArea), async (req: any, res: any) => {
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

router.get('/', async (req: any, res: any) => {
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

router.get('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const area = new Area(req.params.id);
    const result = await area.get();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

router.put('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const area = new Area(req.params.id);
    const result = await area.update(req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const area = new Area(req.params.id);
    const result = await area.delete();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
