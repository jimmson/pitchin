import { Container } from 'typedi';
import mongoose from 'mongoose';
import createError from 'http-errors';
import mongodb = require('mongodb');
import { Area } from './Area';
import { ITicket, IActivity, IComment } from '../interfaces/ITicket';
import Zelos from '../services/zelos';

const activitySchema = new mongoose.Schema({
  time: { type: Date, default: Date.now() },
  action: String,
  source: {
    system: Boolean,
    user: mongodb.ObjectId,
  },
});

const commentSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now() },
  comment: String,
  creator: {
    system: Boolean,
    id: mongodb.ObjectId,
  },
});

const ticketSchema = new mongoose.Schema(
  {
    name: String,
    phone: Number,
    address: String,
    request: String,
    maxParticipants: Number,
    area: mongodb.ObjectId,
    category: mongodb.ObjectId,
    owner: mongodb.ObjectId,
    organisation: mongodb.ObjectId,
    imageURL: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      default: 'new',
    },
    notified: {
      type: Boolean,
      default: false,
    },
    startDate: Date,
    endDate: Date,
    externalID: Number,
    activity: [activitySchema],
    comments: [commentSchema],
  },
  {
    minimize: false,
  },
);

const TicketModel = mongoose.model<ITicket & mongoose.Document>('Ticket', ticketSchema);

export class Ticket {
  data: any;
  id: any;
  constructor(id?: any) {
    this.data = {};
    this.id = id;
  }

  // List tickets with an optional filter
  async list(filter = {}) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'limit' does not exist on type '{}'.
    const limit = filter.limit ? filter.limit : 100;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'skip' does not exist on type '{}'.
    const skip = filter.skip ? filter.skip : 0;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'limit' does not exist on type '{}'.
    delete filter.limit;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'skip' does not exist on type '{}'.
    delete filter.skip;
    const tickets = await TicketModel.find(filter, null, {
      skip: skip,
      limit: limit,
    });
    const result = {
      count: {},
    };
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'returned' does not exist on type '{}'.
    result.count.returned = tickets.length;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'total' does not exist on type '{}'.
    result.count.total = await TicketModel.estimatedDocumentCount();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tickets' does not exist on type '{ count... Remove this comment to see the full error message
    result.tickets = tickets;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{ coun... Remove this comment to see the full error message
    result.settings = {
      limit: limit,
      skip: skip,
    };
    return result;
  }

  // Get a single ticket
  async get() {
    const ticket = await TicketModel.findById(this.id);
    if (ticket) {
      return ticket;
    } else {
      const err = createError(404, {
        status: 'error',
        message: 'Not found',
      });
      throw err;
    }
  }

  async getByField(fields: any) {
    const ticket = await TicketModel.findOne(fields);
    if (ticket) {
      return ticket;
    } else {
      return false;
    }
  }

  // Add a new request ticket
  async add(fields: any, owner: any) {
    for (const [key, value] of Object.entries(fields)) {
      this.data[key] = value;
    }
    this.data.owner = owner;
    const ticket = new TicketModel(this.data);
    const newTicket = await ticket.save();
    console.log(`[i] New ticket: ${newTicket._id}`);
    return {
      id: newTicket._id,
    };
  }

  // Update a ticket
  async update(fields: any) {
    for (const [key, value] of Object.entries(fields)) {
      if (key === 'owner' && value === '') continue;
      this.data[key] = value;
    }
    await TicketModel.updateOne({ _id: this.id }, { ...this.data });
    return {
      status: 'ok',
      message: 'Updated',
      fields: { ...this.data },
    };
  }

  // Assign ownership to ticket
  async assign(userId: any) {
    await TicketModel.updateOne({ _id: this.id }, { owner: userId });
    return {
      status: 'ok',
      message: 'Assigned',
    };
  }
  // Clear ownership
  async unassign() {
    await TicketModel.updateOne({ _id: this.id }, { owner: undefined });
    return {
      status: 'ok',
      message: 'Unassigned',
    };
  }

  // Resolve a ticket
  async resolve(comment: any, user: any) {
    const ticket = await this.get();
    if (ticket.status === 'new') {
      if (comment) {
        this.addComment(comment, user);
      }
      ticket.status = 'resolved';
      ticket.activity.push(<IActivity>{
        action: 'Ticket marked as resolved 👏',
        source: {
          user: user,
        },
      });
      await ticket.save();
      return {
        status: 'ok',
        message: 'Ticket resolved',
      };
    } else {
      const err = createError(409, {
        message: {
          status: 'error',
          message: `Ticket has already been moderated`,
          ticketStatus: ticket.status,
        },
      });
      throw err;
    }
  }

  // Reject a ticket
  async reject(comment: any, user: any, notify: any) {
    const ticket = await this.get();
    if (ticket.status === 'new') {
      // Add a comment if requested
      if (comment && user) {
        this.addComment(comment, user);
      }
      ticket.status = 'rejected';
      ticket.activity.push(<IActivity>{
        action: 'Ticket rejected',
        source: {
          user: ticket.owner,
        },
      });
      // Update ticket
      await ticket.save();
      return { status: 'ok', message: 'Ticket rejected' };
    } else {
      const err = createError(409, {
        message: {
          status: 'error',
          message: 'Conflicting statuses',
          ticketStatus: ticket.status,
        },
      });
      throw err;
    }
  }

  // Approve a ticket
  async approve(query: any) {
    const ticket = await this.get();
    if (ticket.status === 'approved') {
      const err = createError(409, {
        message: {
          status: 'error',
          message: `Ticket already approved`,
        },
      });
      throw err;
    } else if (ticket.status === 'rejected') {
      const err = createError(409, {
        message: {
          status: 'error',
          message: `Can't approve a ticket that has been already rejected`,
        },
      });
      throw err;
    }
    // create an object for task creation input
    const area = await new Area(ticket.area).get();
    const taskDetails = {
      privateFields: {
        name: ticket.name,
        phone: ticket.phone,
        address: ticket.address,
      },
      publicFields: {
        request: ticket.request,
        executionEndDate: ticket.endDate,
        executionStartDate: ticket.startDate,
        maxParticipantsAmount: ticket.maxParticipants,
      },
      settings: {
        group: area.zelos.groupId,
        ...query,
      },
    };
    // Push a task to Zelos
    try {
      const zelos: Zelos = Container.get('zelos');
      ticket.externalID = await zelos.newTask(taskDetails);
    } catch (err) {
      console.error(`[!] Failed to create a task:\n${err}`);
      const error = createError(500, {
        message: {
          status: 'error',
          message: `Failed to create a task on Zelos. Check your workspace settings`,
        },
      });
      throw error;
    }
    // update ticket
    ticket.status = 'approved';
    ticket.save();
    const response = {
      status: 'ok',
    };
    return response;
  }

  // Remove a ticket
  async delete(id = this.id) {
    console.log(`[d] Trying to remove ticket "${id}"`);
    if (id) {
      const res = await TicketModel.deleteOne({
        _id: id,
      });
      if (res.ok === 1) {
        if (res.n) {
          return {
            status: 'ok',
          };
        } else {
          const err = createError(404, {
            status: 'error',
            message: 'Not found',
          });
          throw err;
        }
      }
    } else {
      const err = createError(400, {
        status: 'error',
        message: "No id's specified",
      });
      throw err;
    }
  }

  // Add a comment
  async addComment(comment: any, user = null) {
    let ticket: ITicket & mongoose.Document;
    try {
      ticket = await TicketModel.findById(this.id);
    } catch (err) {
      throw err;
    }
    const newComment: IComment = {
      time: new Date(),
      comment: comment,
      creator: { system: false },
    };
    if (!user) {
      newComment.creator.system = true;
    } else {
      newComment.creator.id = undefined;
    }
    ticket.comments.push(<IComment>newComment);
    const result = await ticket.save();
    return {
      status: 'ok',
      id: result.comments[result.comments.length - 1]._id,
    };
  }

  // Remove a comment
  async removeComment(commentId: any) {
    let ticket: ITicket & mongoose.Document;
    try {
      ticket = await TicketModel.findById(this.id);
    } catch (err) {
      throw err;
    }
    console.log(`Comments before:\n${ticket.comments}`);
    let count = 0;
    ticket.comments = ticket.comments.filter((obj: any) => {
      if (obj._id != commentId) {
        return true;
      } else {
        count++;
      }
    });
    if (count === 1) {
      await ticket.save();
      return {
        status: 'ok',
      };
    } else {
      const err = createError(404, {
        status: 'error',
        message: 'Not found',
      });
      throw err;
    }
  }
}
