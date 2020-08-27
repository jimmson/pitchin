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
    category: {
      isMongoId: true,
    },
    address: {
      isString: true,
      optional: true,
    },
    maxParticipants: {
      isInt: true,
      optional: true,
    },
    hasDate: {
      isBoolean: true,
      optional: true,
    },
    date: {
      optional: true,
    },
    startTime: {
      optional: true,
    },
    endTime: {
      optional: true,
    },
  },
};

module.exports = validation;
