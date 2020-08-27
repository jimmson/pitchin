// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validation... Remove this comment to see the full error message
const validation = {
  addTicket: {
    name: {
      isString: true,
    },
    phone: {
      isInt: true,
    },
    request: {
      isString: true,
    },
    area: {
      isMongoId: true,
    },
    address: {
      isString: true,
      optional: true,
    },
    category: {
      isMongoId: true,
    },
  },
  approveTicket: {
    notify: {
      optional: true,
      toBoolean: {
        strict: true,
      },
    },
  },
};

module.exports = validation;
