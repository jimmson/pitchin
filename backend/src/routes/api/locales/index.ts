// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'locales'.
const locales = require('express').Router();
// const { checkSchema, validationResult } = require('express-validator');
// const validation = require('./validation');
import handleError from '../../../middleware/HandleError';
import { Locale } from '../../../models/Locale';

// Create a locale
locales.post('/', async (req: any, res: any) => {
  try {
    const result = await new Locale().add(req.body.name, req.body.code);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// List all locales
locales.get('/', async (req: any, res: any) => {
  try {
    const active = req.query.active ? true : false;
    const result = await new Locale().list(active);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Get a locale
locales.get('/:id', async (req: any, res: any) => {
  try {
    const result = await new Locale().get(req.params.id);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Update a locale
locales.put('/:id', async (req: any, res: any) => {
  try {
    const result = await new Locale().update(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = locales;
