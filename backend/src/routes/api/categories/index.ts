import express from 'express';
import handleError from '../../../middleware/HandleError';
import { Category } from '../../../models/Category';

const router = express.Router();

router.post('/', async (req: any, res: any) => {
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

router.get('/', async (req: any, res: any) => {
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

router.get('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const category = new Category(req.params.id);
    const result = await category.get();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});
router.put('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const category = new Category(req.params.id);
    const result = await category.update(req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete('/:id', async (req: any, res: any) => {
  try {
    // todo: validation
    const category = new Category(req.params.id);
    const result = await category.delete();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
