// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tickets'.
const tickets = require('express').Router();
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkSchem... Remove this comment to see the full error message
const { checkSchema, validationResult, matchedData } = require('express-validator');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validation... Remove this comment to see the full error message
const validation = require('./validation');
import { Ticket } from '../../../models/Ticket';
import handleError from '../../../middleware/HandleError';

// List all tickets
tickets.get('/', async (req: any, res: any) => {
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
tickets.post('/', checkSchema(validation.addTicket), async (req: any, res: any) => {
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
tickets.put('/:id/assign', async (req: any, res: any) => {
  try {
    // unvalidated
    const ticket = new Ticket(req.params.id);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    result = await ticket.assign(req.query.id);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Clear ticket owner
tickets.delete('/:id/assign', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    result = await ticket.unassign();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Get a single ticket
tickets.get('/:id', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    result = await ticket.get();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Update ticket details
tickets.put('/:id', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    result = await ticket.update(req.body);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Approve ticket
tickets.put('/:id/approve', checkSchema(validation.approveTicket), async (req: any, res: any) => {
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
tickets.put('/:id/resolve', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    const result = await ticket.resolve(req.body.comment, req.user._id);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Reject ticket
tickets.put('/:id/reject', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    const result = await ticket.reject(req.body.comment, req.user._id, req.query.notify);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Archive ticket
tickets.put('/:id/archive', async (req: any, res: any) => {
  try {
    const ticket = new Ticket(req.params.id);
    // TODO
  } catch (err) {
    handleError(err, res);
  }
});

// Delete a ticket
tickets.delete('/:id', async (req: any, res: any) => {
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
tickets.post('/:id/comments', async (req: any, res: any) => {
  try {
    // unvalidated
    const ticket = new Ticket(req.params.id);
    const user = null; // todo: add user ID
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    result = await ticket.addComment(req.body.comment, user);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Delete a comment
tickets.delete('/:id/comments/:commentId', async (req: any, res: any) => {
  try {
    // unvalidated
    const ticket = new Ticket(req.params.id);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    result = await ticket.removeComment(req.params.commentId);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = tickets;
