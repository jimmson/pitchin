import { Container } from 'typedi';
import UserService from '../services/users';
import { Category } from '../models/Category';
import { Area } from '../models/Area';
import { Locale } from '../models/Locale';

export default async (): Promise<boolean> => {
  try {
    const usersService = Container.get(UserService);
    const result = await usersService.list();
    if (result.count.total > 0) {
      return false;
    }

    await initDatabase();
    await createDefaults();

    return true;
  } catch (err) {
    throw err;
  }
};

async function initDatabase() {
  try {
    console.log(`[i] Setting up a new database`);
    // Set up workspace details
    // Create admin account
    console.log(`[d] Creating admin account for ${process.env.INIT_ADMIN_EMAIL}`);
    const usersService = Container.get(UserService);
    await usersService.create(process.env.INIT_ADMIN_EMAIL, '', '', process.env.INIT_ADMIN_PASSWORD, true);
  } catch (err) {
    console.error(`[!] Something went wrong during database setup:\n${err.stack}`);
  }
}

async function createDefaults() {
  try {
    console.log(`[i] Creating default user and content`);
    // Add sample category
    console.log(`[d] Adding sample category`);
    await new Category().add({ name: 'Sample Request Category', needsAddress: true });
    // Add default locale
    console.log(`[d] Adding default locale`);
    await new Locale().initDefault();
    // Add sample area
    console.log(`[d] Adding sample area`);
    await new Area().add({ name: 'Sample Area' });
  } catch (err) {
    console.error(`[!] Something went wrong during database setup:\n${err.stack}`);
  }
}
