export const CONFIG_REGISTRY = {
  CONFIG: Symbol.for('MODULE::INFRA::CONFIG'),
  ENV: Symbol.for('MODULE::INFRA::CONFIG::ENV'),
  API: {
    URL: Symbol.for('MODULE::INFRA::CONFIG::API::URL'),
  },
  ENCRYPTION: {
    KEY: Symbol.for('MODULE::INFRA::CONFIG::ENCRYPTION::KEY'),
    ALGORITHM: Symbol.for('MODULE::INFRA::CONFIG::ENCRYPTION::ALGORITHM'),
    BREAKPOINT: Symbol.for('MODULE::INFRA::CONFIG::ENCRYPTION::BREAKPOINT'),
  },
};
