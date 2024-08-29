export const USE_CASE_REGISTRY = {
  USER: {
    LOGIN: Symbol.for('MODULE::APP::USE_CASE::USER::LOGIN'),
    SIGNUP: Symbol.for('MODULE::APP::USE_CASE::USER::SIGNUP'),
    SECURITY: {
      DECODE: Symbol.for('MODULE::APP::USE_CASE::USER::SECURITY::DECODE'),
    },
  },
};
