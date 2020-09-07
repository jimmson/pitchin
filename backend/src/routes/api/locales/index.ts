import express from 'express';
import handleError from '../../../middleware/HandleError';
import { Locale } from '../../../models/Locale';

const router = express.Router();
// const { checkSchema, validationResult } = require('express-validator');
// const validation = require('./validation');

// Create a locale
router.post('/', async (req: any, res: any) => {
  try {
    const result = await new Locale().add(req.body.name, req.body.code);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// List all locales
router.get('/', async (req: any, res: any) => {
  try {
    const active = req.query.active ? true : false;
    const result = await new Locale().list(active);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Get a locale
router.get('/:id', async (req: any, res: any) => {
  try {
    const result = await new Locale().get(req.params.id);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Update a locale
router.put('/:id', async (req: any, res: any) => {
  try {
    const result = await new Locale().update(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
