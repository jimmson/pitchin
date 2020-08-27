// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'health'.
const health = require('express').Router();
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'mongoose'.
const mongoose = require('mongoose');

health.get('/', async (req: any, res: any) => {
  if (mongoose.connection.readyState) {
    res.send({ healthy: true });
  }
});

module.exports = health;
