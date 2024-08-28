import lazy from 'inversify-inject-decorators';
import { Container } from 'inversify';
import { ENGINE_REGISTRY } from './engine.registry';
import { HttpNodeEngine } from './gateway/http/node/node.gateway';
import { AxiosHttpGateway } from './gateway/http/axios/axios.gateway';

export const ENGINE_MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

ENGINE_MODULE.bind(ENGINE_REGISTRY.GATEWAY.HTTP.NODE).to(HttpNodeEngine);
ENGINE_MODULE.bind(ENGINE_REGISTRY.GATEWAY.HTTP.AXIOS).to(AxiosHttpGateway);

export const { lazyInject: injectEngine } = lazy(ENGINE_MODULE);
