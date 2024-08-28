import { JWT } from '@/@type/module/infra/engine/auth/jwt.type';
import { ENGINE_MODULE } from './engine.module';
import { ENGINE_REGISTRY } from './engine.registry';
import { AxiosHttpGateway } from './gateway/http/axios/axios.gateway';
import { HttpNodeEngine } from './gateway/http/node/node.gateway';
import { SanityClient } from 'sanity';

export const ENGINE_FACTORY = {
  AUTH: {
    JWT: () => ENGINE_MODULE.get<JWT>(ENGINE_REGISTRY.AUTH.JWT),
  },
  GATEWAY: {
    CMS: {
      SANITY: () =>
        ENGINE_MODULE.get<SanityClient>(ENGINE_REGISTRY.GATEWAY.CMS.SANITY),
    },
    HTTP: {
      NODE: () =>
        ENGINE_MODULE.get<HttpNodeEngine>(ENGINE_REGISTRY.GATEWAY.HTTP.NODE),

      AXIOS: () =>
        ENGINE_MODULE.get<AxiosHttpGateway>(ENGINE_REGISTRY.GATEWAY.HTTP.AXIOS),
    },
  },
};
