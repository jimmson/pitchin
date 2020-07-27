const tickets = require("express").Router();
const { checkSchema, validationResult, matchedData } = require("express-validator");
const validation = require("./validation.js");
const appRoot = require("app-root-path");
const Ticket = require(appRoot + "/models/Ticket");
const handleError = require(appRoot + "/middleware/HandleError");

// List all tickets
tickets.get("/", async (req, res) => {
  try {
    const ticket = new Ticket();
    const result = await ticket.list({
      ...req.query,
    });
    res.json({
      status: "ok",
      count: result.count,
      tickets: result.tickets,
      settings: result.settings,
    });
  } catch (err) {
    handleError(err, res);
  }
});

// Create a ticket
tickets.post("/", checkSchema(validation.addTicket), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const ticket = new Ticket();
  const data = matchedData(req);
  try {
    const id = await ticket.add(
      {
        ...data,
      },
      req.user._id
    );
    res.status(201).send(id);
  } catch (err) {
    handleError(err, res);
  }
});

// Assign user to ticket
tickets.put("/:id/assign", async (req, res) => {
  try {
    // unvalidated
    const ticket = new Ticket(req.params.id);
    result = await ticket.assign(req.query.id);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Clear ticket owner
tickets.delete("/:id/assign", async (req, res) => {
  try {
    const ticket = new Ticket(req.params.id);
    result = await ticket.unassign();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Get a single ticket
tickets.get("/:id", async (req, res) => {
  try {
    const ticket = new Ticket(req.params.id);
    result = await ticket.get();
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Update ticket details
tickets.put("/:id", async (req, res) => {
  try {
    const ticket = new Ticket(req.params.id);
    result = await ticket.update(req.body);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Approve ticket
tickets.put("/:id/approve", checkSchema(validation.approveTicket), async (req, res) => {
  try {
    const ticket = new Ticket(req.params.id);
    const result = await ticket.approve(req.body.comment, req.user._id);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Resolve ticket
tickets.put("/:id/resolve", async (req, res) => {
  try {
    const ticket = new Ticket(req.params.id);
    const result = await ticket.resolve(req.body.comment, req.user._id)
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Reject ticket
tickets.put("/:id/reject", async (req, res) => {
  try {
    const ticket = new Ticket(req.params.id);
    const result = await ticket.reject(req.body.comment, req.user._id, req.query.notify)
    res.send(result)
  } catch (err) {
    handleError(err, res);
  }
});

// Archive ticket
tickets.put("/:id/archive", async (req, res) => {
  try {
    const ticket = new Ticket(req.params.id);
    // TODO
  } catch (err) {
    handleError(err, res);
  }
});

// Delete a ticket
tickets.delete("/:id", async (req, res) => {
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
tickets.post("/:id/comments", async (req, res) => {
  try {
    // unvalidated
    const ticket = new Ticket(req.params.id);
    const user = null; // todo: add user ID
    result = await ticket.addComment(req.body.comment, user);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

// Delete a comment
tickets.delete("/:id/comments/:commentId", async (req, res) => {
  try {
    // unvalidated
    const ticket = new Ticket(req.params.id);
    result = await ticket.removeComment(req.params.commentId);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = tickets;
