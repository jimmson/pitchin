import { Container } from 'typedi';
import UserService from '../../../services/users';

const auth = require('express').Router();
// const { checkSchema, validationResult } = require('express-validator');
// const validation = require('./validation');
import handleError from '../../../middleware/HandleError';

// register an account using invite token
auth.put('/register/:token', async (req: any, res: any) => {
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
auth.post('/login', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    const result = await usersService.login(req.body.email, req.body.password);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// request a password reset
auth.post('/reset', async (req: any, res: any) => {
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
auth.put('/reset/:token', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 1.
    usersService.register(req.params.token);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// check if reset token is valid
auth.get('/reset/:token', async (req: any, res: any) => {
  try {
    const usersService = Container.get(UserService);
    const result = await usersService.checkToken(req.params.token);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = auth;
