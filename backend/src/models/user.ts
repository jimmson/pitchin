import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
  },
  status: {
    admin: {
      type: Boolean,
    },
    online: {
      type: Boolean,
    },
    registered: {
      type: Boolean,
    },
    archived: {
      type: Boolean,
    },
  },
  credentials: {
    password: {
      type: String,
    },
    resetToken: {
      type: String,
    },
  },
});

export default mongoose.model<IUser & mongoose.Document>('User', User);
