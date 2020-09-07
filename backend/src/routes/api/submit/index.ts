import express from 'express';

const submit = express.Router();

// Submit a ticket
submit.post('/', async (req: any, res: any) => {
  res.status(404).send('Deprecated. Use /api/public/tickets');
});

submit.get('/', async (req: any, res: any) => {
  res.status(404).send('Deprecated. Use /api/public/options');
});

export default submit;
