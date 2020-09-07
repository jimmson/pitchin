import { Container } from 'typedi';
import express from 'express';
import UserService from '../../../services/users';
import handleError from '../../../middleware/HandleError';

const router = express.Router();
// const { checkSchema, validationResult } = require('express-validator');
// const validation = require('./validation');

// register an account using invite token
router.put('/register/:token', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    const result = await usersService.register(
      req.params.token,
      req.body.firstName,
      req.body.lastName,
      req.body.password,
    );
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// log in
router.post('/login', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    const result = await usersService.login(req.body.email, req.body.password);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// request a password reset
router.post('/reset', async (req: any, res: any) => {
  try {
    res.status(200).send({
      status: 'ok',
    });
    const usersService = Container.get(UserService);
    usersService.newReset(req.query.email);
  } catch (err) {
    handleError(err, res);
  }
});

// reset user password
// TODO: FIX THIS
router.put('/reset/:token', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 1.
    const result = usersService.register(req.params.token);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// check if reset token is valid
router.get('/reset/:token', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    const result = await usersService.checkToken(req.params.token);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
