export const ENGINE_REGISTRY = {
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
