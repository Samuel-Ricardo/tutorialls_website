export const USE_CASE_REGISTRY = {
  USER: {
    LOGIN: Symbol.for('MODULE::APP::USE_CASE::USER::LOGIN'),
    SIGNUP: Symbol.for('MODULE::APP::USE_CASE::USER::SIGNUP'),
    SECURITY: {
      DECODE: Symbol.for('MODULE::APP::USE_CASE::USER::SECURITY::DECODE'),
    },
  },
  TUTORIAL: {
    CREATE: Symbol.for('MODULE::APP::USE_CASE::TUTORIAL::CREATE'),
    UPDATE: Symbol.for('MODULE::APP::USE_CASE::TUTORIAL::UPDATE'),
    DELETE: Symbol.for('MODULE::APP::USE_CASE::TUTORIAL::DELETE'),
    LIST: {
      ALL: Symbol.for('MODULE::APP::USE_CASE::TUTORIAL::LIST::ALL'),
    },
    FILTER: {
      BY: {
        TITLE: Symbol.for('MODULE::APP::USE_CASE::TUTORIAL::FILTER::BY::TITLE'),
        CONTENT: Symbol.for(
          'MODULE::APP::USE_CASE::TUTORIAL::FILTER::BY::CONTENT',
        ),
        AUTHOR: Symbol.for(
          'MODULE::APP::USE_CASE::TUTORIAL::FILTER::BY::AUTHOR',
        ),
      },
    },
  },
};
