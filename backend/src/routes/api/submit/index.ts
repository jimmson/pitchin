// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'submit'.
const submit = require('express').Router();

// Submit a ticket
submit.post('/', async (req: any, res: any) => {
  res.status(404).send('Deprecated. Use /api/public/tickets');
});

submit.get('/', async (req: any, res: any) => {
  res.status(404).send('Deprecated. Use /api/public/options');
});

module.exports = submit;
