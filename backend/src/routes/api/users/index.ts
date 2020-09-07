import express from 'express';
import { Container } from 'typedi';
import UserService from '../../../services/users';
import handleError from '../../../middleware/HandleError';

const router = express.Router();

// invite an user
router.post('/invite', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    const admin = req.body.admin ? true : false;
    const result = await usersService.invite(req.body.email, admin);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// list all users
router.get('/', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    const result = await usersService.list(req.query.limit, req.query.skip);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// show user details
router.get('/:id', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    const data = await new usersService.get(req.params.id);
    res.send(data);
  } catch (err) {
    handleError(err, res);
  }
});

// update user details
router.put('/:id', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    const result = await usersService.update(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
