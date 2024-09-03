import { Container } from 'inversify';
import { MOCKED_MODULE } from '../../app.registry';
import {
  mockAxiosHttpTutorialGateway,
  simulateAxiosHttpTutorialsGateway,
} from './http/axios/tutorial.gateway';

export const _MODULE = new Container({
  autoBindInjectable: true,
});

export const GATEWAY_MODULE_MOCK = _MODULE;

GATEWAY_MODULE_MOCK.bind(
  MOCKED_MODULE.APPLICATION.GATEWAY.HTTP.AXIOS.TUTORIAL.SIMULATED,
).toConstantValue(simulateAxiosHttpTutorialsGateway);

GATEWAY_MODULE_MOCK.bind(
  MOCKED_MODULE.APPLICATION.GATEWAY.HTTP.AXIOS.TUTORIAL.MOCKED,
).toDynamicValue(mockAxiosHttpTutorialGateway);
