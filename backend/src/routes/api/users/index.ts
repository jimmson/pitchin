import { Container } from 'typedi';
import UserService from '../../../services/users';

const users = require('express').Router();
const appRoot = require('app-root-path');
const handleError = require(appRoot + '/src' + '/middleware/HandleError');

// invite an user
users.post('/invite', async (req, res) => {
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
users.get('/', async (req, res) => {
  try {
    const usersService = Container.get(UserService);
    const result = await usersService.list(req.query.limit, req.query.skip);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// show user details
users.get('/:id', async (req, res) => {
  try {
    const usersService = Container.get(UserService);
    const data = await new usersService.get(req.params.id);
    res.send(data);
  } catch (err) {
    handleError(err, res);
  }
});

// update user details
users.put('/:id', async (req, res) => {
  try {
    const usersService = Container.get(UserService);
    result = await usersService.update(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = users;
