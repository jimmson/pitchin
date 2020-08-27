import authenticate from '../../middleware/Authenticate';
import authorize from '../../middleware/Authorize';

const routes = require('express').Router();

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tickets'.
const tickets = require('./tickets');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'categories... Remove this comment to see the full error message
const categories = require('./categories');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'areas'.
const areas = require('./areas');
const users = require('./users');
const auth = require('./auth');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'locales'.
const locales = require('./locales');
const publicRoutes = require('./public');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'settings'.
const settings = require('./settings');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'health'.
const health = require('./health');

// to be deprecated
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'submit'.
const submit = require('./submit');
routes.use('/submit', submit);

routes.use('/tickets', authenticate, tickets);
routes.use('/categories', authenticate, authorize, categories);
routes.use('/areas', authenticate, authorize, areas);
routes.use('/users', authenticate, authorize, users);
routes.use('/auth', auth);
routes.use('/locales', authenticate, authorize, locales);
routes.use('/public', publicRoutes);
routes.use('/settings', authenticate, authorize, settings);
routes.use('/health', health), (module.exports = routes);
