import { SANITY_CLIENT_TYPE } from '@/@type/module/infra/engine/gateway/cms/sanity.type';
import { ENGINE_MODULE } from './engine.module';
import { ENGINE_REGISTRY } from './engine.registry';
import { AxiosHttpGateway } from './gateway/http/axios/axios.gateway';
import { HttpNodeEngine } from './gateway/http/node/node.gateway';

export const ENGINE_FACTORY = {
  GATEWAY: {
    CMS: {
      SANITY: () =>
        ENGINE_MODULE.get<SANITY_CLIENT_TYPE>(
          ENGINE_REGISTRY.GATEWAY.CMS.SANITY,
        ),
    },
    HTTP: {
      NODE: () =>
        ENGINE_MODULE.get<HttpNodeEngine>(ENGINE_REGISTRY.GATEWAY.HTTP.NODE),

      AXIOS: () =>
        ENGINE_MODULE.get<AxiosHttpGateway>(ENGINE_REGISTRY.GATEWAY.HTTP.AXIOS),
    },
  },
};
