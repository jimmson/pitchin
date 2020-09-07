import express from 'express';
import authenticate from '../../middleware/Authenticate';
import authorize from '../../middleware/Authorize';
import tickets from './tickets';
import publicRoutes from './public';
import auth from './auth';
import categories from './categories';
import areas from './areas';
import users from './users';
import locales from './locales';
import health from './health';
import submit from './submit';

const routes = express.Router();

routes.use('/submit', submit);
routes.use('/tickets', authenticate, tickets);
routes.use('/categories', authenticate, authorize, categories);
routes.use('/areas', authenticate, authorize, areas);
routes.use('/users', authenticate, authorize, users);
routes.use('/auth', auth);
routes.use('/locales', authenticate, authorize, locales);
routes.use('/public', publicRoutes);
routes.use('/health', health);

export default routes;
