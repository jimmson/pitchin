import { Service } from 'typedi';
import UserModel from '../models/user';
import { EventDispatcher } from 'event-dispatch';
import { UserEventSubscriber } from '../subscribers/user';

const mongoose = require('mongoose');
const createError = require('http-errors');
const Mailgun = require('../models/Mailgun');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

@Service()
export default class UserService {
  private dispatcher: EventDispatcher;

  constructor() {
    this.dispatcher = new EventDispatcher();
  }

  // invite an user
  async invite(email: string, admin = false) {
    let user = await UserModel.findOne({ email: email });
    if (user !== null) {
      const err = createError(409, {
        status: 'error',
        message: 'User with email exists',
      });
      throw err;
    }

    user = new UserModel();
    user.email = email;
    user.status.admin = admin;
    // create a password reset token
    user.credentials.resetToken = this.newToken();
    // email an invite
    if (!process.env.DEV) {
      const invite = new Mailgun(user.email);
      const link = `https://${process.env.APP_HOST}/auth/register/${user.credentials.resetToken}`;
      invite.send(
        `Invitation to ${process.env.WORKSPACE_NAME}`,
        `Hello,\n\nYou have been invited to join the team at ${process.env.WORKSPACE_NAME}.\n\nGet started by creating your account at ${link}`,
      );
    } else {
      console.log(`[d] Invite token for ${user.email}: "${user.credentials.resetToken}"`);
    }
    const result = await user.save();
    return {
      id: result._id,
    };
  }

  async create(email: string, firstName: string, lastName: string, password: string) {
    const user = new UserModel({
      email: email,
      firstName: firstName,
      lastName: lastName,
      status: {
        admin: true,
      },
      credentials: {
        password: password !== '' ? await bcrypt.hash(password, 10) : null,
      },
    });
    await user.save();

    this.dispatcher.dispatch(UserEventSubscriber.EVENT_USER_CREATE, user);
  }

  // create an account
  async register(token: string, firstName: string, lastName: string, password: string) {
    let user = await UserModel.findOne({
      'credentials.resetToken': token,
    });
    if (!user) {
      // No user with token
      const err = createError(404, {
        status: 'error',
        message: 'Invalid token',
      });
      throw err;
    } else if (user.status.registered) {
      // User is already registered
      const err = createError(409, {
        status: 'error',
        message: 'User account exists',
      });
      throw err;
    }

    user.credentials.password = await bcrypt.hash(password, 10);
    user.firstName = firstName;
    user.lastName = lastName;
    user.credentials.resetToken = ''; // clear the reset token
    user.status.registered = true;
    await user.save();

    return {
      status: 'ok',
      message: 'User created',
    };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      console.log(`[d] Non-existent user "${email}" tried to log in`);
      const error = createError(404, {
        status: 'error',
        message: 'No user with this email',
      });
      throw error;
    }

    const match = await bcrypt.compare(password, user.credentials.password);
    if (!match) {
      const error = createError(401, {
        status: 'error',
        message: 'Password mismatch',
      });
      throw error;
    }

    const token = jwt.sign(
      {
        _id: user._id,
        admin: user.status.admin,
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: process.env.JWT_TTL,
      },
    );
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const result = {
      token: token,
      exp: payload.exp,
      admin: user.status.admin,
    };
    console.log(`[d] User "${email}" logged in`);
    return result;
  }

  // update user details
  async update(id: string, fields: string) {
    try {
      const user = await this.init(id);
      for (const [key, value] of Object.entries(fields)) {
        user[key] = value;
      }
      await user.save();
      return {
        status: 'ok',
      };
    } catch (err) {
      throw err;
    }
  }

  // request password reset
  async newReset(email: string) {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        console.log(`[w] Got Password reset request for non-existing email: ${email}`);
      } else if (!user.status.registered) {
        console.log(`[w] Got Password reset request for non-activated account: ${email}`);
      }

      user.credentials.resetToken = this.newToken();
      const invite = new Mailgun(user.email);
      await invite.send(
        `Password reset`,
        `Hello,\n\nA password reset has been requested for your account at ${process.env.WORKSPACE_NAME}.\nYou can set a new password here: https://${process.env.APP_HOST}/auth/reset-password/${user.credentials.resetToken}\n\nIf you didn't ask for this reset you can safely ignore this letter`,
      );
      user.save();
    } catch (err) {}
  }

  // check reset token
  async checkToken(token: string) {
    const user = await UserModel.findOne({
      'credentials.resetToken': token,
    });
    if (!user) {
      const err = createError(404, {
        status: 'error',
        message: 'Invalid token',
      });
      throw err;
    }
    return {
      status: 'ok',
    };
  }

  // reset user password
  async reset(token: string, password: string) {
    const user = await UserModel.findOne({
      'credentials.resetToken': token,
    });
    if (!user) {
      const err = createError(404, {
        status: 'error',
        message: 'Invalid token',
      });
      throw err;
    }
    user.credentials = {
      password: await bcrypt.hash(password, 10),
      resetToken: '', // clear the reset token
    };
    await user.save();
    return {
      status: 'ok',
      message: 'Password updated',
    };
  }

  // list all users
  async list(limit = 100, skip = 0) {
    const users = await UserModel.find({}, null, {
      skip: skip,
      limit: limit,
    });

    return {
      count: {
        returned: users.length,
        total: await UserModel.estimatedDocumentCount(),
      },
      users: users.map((user) => {
        user = user.toObject();
        delete user.credentials;
        return user;
      }),
      settings: {
        limit: limit,
        skip: skip,
      },
    };
  }

  // get user details as an object
  async get(id) {
    const user = await UserModel.findById(id);
    if (user) {
      const userObj = user.toObject();
      delete userObj.credentials;
      return userObj;
    } else {
      const err = createError(404, {
        status: 'error',
        message: 'Not found',
      });
      throw err;
    }
  }

  // get user model with data
  async init(id) {
    const user = await UserModel.findById(id);
    if (user) {
      return user;
    } else {
      const err = createError(404, {
        status: 'error',
        message: 'Not found',
      });
      throw err;
    }
  }

  async getUserByField(fields) {
    const user = await UserModel.findOne(fields);
    if (user) {
      return user;
    } else {
      return false;
    }
  }

  // search for users
  async find(fields = {}) {
    if (fields) {
      let result;
      const users = await UserModel.find({ fields });
      if (users) {
        result = {
          status: 'ok',
          users: users,
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

  // create default user
  async initDefault() {
    const user = await this.getUserByField({ email: process.env.ADMIN_EMAIL });
    if (!user) {
      const user = new UserModel();
      user.email = process.env.ADMIN_EMAIL;
      user.firstName = 'Default';
      user.lastName = 'Admin';
      user.status.admin = true;
      user.status.registered = true;
      user.credentials.password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      console.log(`[i] Created default user`);
      await user.save();
    }
  }

  newToken() {
    const token = crypto
      .createHash('md5')
      .update(`${Date.now() + Math.floor(Math.random() * 10000)}`)
      .digest('hex');
    return token;
  }
}
