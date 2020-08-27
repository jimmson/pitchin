// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validation... Remove this comment to see the full error message
const validation = {
  zelos: {
    confirmAssignment: {
      isBoolean: true,
    },
    confirmCompletion: {
      isBoolean: true,
    },
    subdomain: {
      isString: true,
    },
    email: {
      isEmail: true,
    },
    password: {
      optional: true,
    },
  },
  workspace: {
    name: {
      isString: true,
    },
  },
  sms: {
    prefix: {
      isInt: true,
      optional: true,
    },
    sendRejectText: {
      isBoolean: true,
      optional: true,
    },
    sendAcceptText: {
      isBoolean: true,
      optional: true,
    },
    acceptText: {
      isString: true,
      optional: true,
    },
    rejectText: {
      isString: true,
      optional: true,
    },
    Infobip: {
      baseUrl: {
        isString: true,
        optional: true,
      },
      apiKey: {
        isString: true,
        optional: true,
      },
    },
  },
};

module.exports = validation;
