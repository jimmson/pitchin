export default {
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
