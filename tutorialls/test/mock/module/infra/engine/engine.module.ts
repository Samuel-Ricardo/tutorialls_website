import { Container } from 'inversify';
import { MOCKED_MODULE } from '../../app.registry';
import { mockAxiosHttpGateway } from './gateway/http/axios.gateway';

export const ENGINE_MODULE_MOCK = new Container({
  defaultScope: 'Singleton',
  autoBindInjectable: true,
});

ENGINE_MODULE_MOCK.bind(
  MOCKED_MODULE.INFRA.ENGINE.GATEWAY.HTTP.AXIOS.MOCKED,
).toConstantValue(mockAxiosHttpGateway);
