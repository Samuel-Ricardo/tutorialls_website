export const GATEWAY_REGISTRY = {
  CMS: {
    SANITY: Symbol.for('MODULE::APP::GATEWAY::CMS::SANITY'),
  },
  HTTP: {
    AXIOS: {
      AUTH: Symbol.for('MODULE::APP::GATEWAY::HTTP::AXIOS::AUTH'),
      TUTORIAL: Symbol.for('MODULE::APP::GATEWAY::HTTP::AXIOS::TUTORIAL'),
    },
  },
};
