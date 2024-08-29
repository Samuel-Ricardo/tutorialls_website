export const ENGINE_REGISTRY = {
  AUTH: {
    JWT: Symbol.for('MODULE::INFRA::ENGINE::AUTH::JWT'),
  },
  GATEWAY: {
    HTTP: {
      NODE: Symbol.for('MODULE::INFRA::ENGINE::GATEWAY::HTTP'),
      AXIOS: Symbol.for('MODULE::INFRA::ENGINE::GATEWAY::HTTP::AXIOS'),
    },
    CMS: {
      SANITY: Symbol.for('MODULE::INFRA::ENGINE::GATEWAY::CMS::SANITY'),
    },
  },
};
