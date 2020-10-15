import { Service } from 'typedi';
import Model from '../models/organisation';
import { IOrganisation } from '../interfaces/IOrganisation';

@Service()
export default class OrganisationService {
  constructor() {}

  async findOrCreate(name: string) {
    let organisation = await Model.findOne({ name: name });
    if (organisation !== null) {
      return organisation._id;
    }

    organisation = new Model();
    organisation.name = name;

    const result = await organisation.save();
    return result._id;
  }

  async list(): Promise<IOrganisation[]> {
    return Model.find({});
  }
}
