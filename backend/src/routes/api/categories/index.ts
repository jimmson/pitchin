// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'categories... Remove this comment to see the full error message
const categories = require('express').Router();
import handleError from '../../../middleware/HandleError';
import { Category } from '../../../models/Category';

categories.post('/', async (req: any, res: any) => {
  try {
    // todo: validation
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const category = new Category();
    const id = await category.add(req.body);
    res.status(201).send(id);
  } catch (err) {
    handleError(err, res);
  }
});
categories.get('/', async (req: any, res: any) => {
  try {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const category = new Category();
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const list = await category.list();
    res.send(list);
  } catch (err) {
    handleError(err, res);
  }
});

categories.get('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const category = new Category(req.params.id);
    const result = await category.get();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});
categories.put('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const category = new Category(req.params.id);
    const result = await category.update(req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});
categories.delete('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const category = new Category(req.params.id);
    const result = await category.delete();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = categories;
