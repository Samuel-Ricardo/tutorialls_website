import { DeepMockProxy } from 'jest-mock-extended';
import { ENGINE_MODULE_MOCK } from './engine.module';
import { AxiosHttpGateway } from '@/@module/infra/engine/gateway/http/axios/axios.gateway';
import { MOCKED_MODULE } from '../../app.registry';

export const ENGINE_FACTORY_MOCK = {
  GATEWAY: {
    HTTP: {
      AXIOS: {
        MOCKED: () =>
          ENGINE_MODULE_MOCK.get<DeepMockProxy<AxiosHttpGateway>>(
            MOCKED_MODULE.INFRA.ENGINE.GATEWAY.HTTP.AXIOS.MOCKED,
          ),
      },
    },
  },
};
