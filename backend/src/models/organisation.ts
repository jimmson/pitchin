import mongoose from 'mongoose';
import { IOrganisation } from '../interfaces/IOrganisation';

const schema = new mongoose.Schema({
  name: String,
});

export default mongoose.model<IOrganisation & mongoose.Document>('organisation', schema);
