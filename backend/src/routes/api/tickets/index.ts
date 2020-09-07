const { checkSchema, validationResult, matchedData } = require('express-validator');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validation... Remove this comment to see the full error message
const validation = require('./validation');
import express from 'express';
import { Ticket } from '../../../models/Ticket';
import handleError from '../../../middleware/HandleError';

const router = express.Router();

// List all tickets
router.get('/', async (req: any, res: any) => {
  try {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const ticket = new Ticket();
    const result = await ticket.list({
      ...req.query,
    });
    res.json({
      status: 'ok',
      count: result.count,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'tickets' does not exist on type '{ count... Remove this comment to see the full error message
      tickets: result.tickets,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{ coun... Remove this comment to see the full error message
      settings: result.settings,
    });
  } catch (err) {
    handleError(err, res);
  }
});

// Create a ticket
router.post('/', checkSchema(validation.addTicket), async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
  const ticket = new Ticket();
  const data = matchedData(req);
  try {
    const id = await ticket.add(
      {
        ...data,
      },
      req.user._id,
    );
    res.status(201).send(id);
  } catch (err) {
    handleError(err, res);
  }
});

// Assign user to ticket
router.put('/:id/assign', async (req: any, res: any) => {
  try {
    // unvalidated
    const ticket = new Ticket(req.params.id);
    const result = await ticket.assign(req.query.id);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Clear ticket owner
router.delete('/:id/assign', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    const result = await ticket.unassign();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Get a single ticket
router.get('/:id', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    const result = await ticket.get();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Update ticket details
router.put('/:id', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    const result = await ticket.update(req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Approve ticket
router.put('/:id/approve', checkSchema(validation.approveTicket), async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    const result = await ticket.approve(req.body.comment, req.user._id);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Resolve ticket
router.put('/:id/resolve', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    const result = await ticket.resolve(req.body.comment, req.user._id);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Reject ticket
router.put('/:id/reject', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    const result = await ticket.reject(req.body.comment, req.user._id, req.query.notify);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Archive ticket
router.put('/:id/archive', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    // TODO
  } catch (err) {
    handleError(err, res);
  }
});

// Delete a ticket
router.delete('/:id', async (req: any, res: any) => {
  try {
    // unvalidated
    const ticket = new Ticket(req.params.id);
    const result = await ticket.delete();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Add a comment to a ticket
router.post('/:id/comments', async (req: any, res: any) => {
  try {
    // unvalidated
    const ticket = new Ticket(req.params.id);
    const user = null; // todo: add user ID
    const result = await ticket.addComment(req.body.comment, user);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Delete a comment
router.delete('/:id/comments/:commentId', async (req: any, res: any) => {
  try {
    // unvalidated
    const ticket = new Ticket(req.params.id);
    const result = await ticket.removeComment(req.params.commentId);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
