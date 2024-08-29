import lazy from 'inversify-inject-decorators';
import { Container } from 'inversify';
import { ENGINE_REGISTRY } from './engine.registry';
import { HttpNodeEngine } from './gateway/http/node/node.gateway';
import { AxiosHttpGateway } from './gateway/http/axios/axios.gateway';
import { SANITY_CLIENT } from './gateway/cms/sanity/sanity.engine';
import { CONFIG_MODULE } from '../config/config.module';
import { JWT_ENGINE } from './auth/jwt/jwt.engine';

const _MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export const ENGINE_MODULE = Container.merge(_MODULE, CONFIG_MODULE);

ENGINE_MODULE.bind(ENGINE_REGISTRY.GATEWAY.HTTP.NODE).to(HttpNodeEngine);
ENGINE_MODULE.bind(ENGINE_REGISTRY.GATEWAY.HTTP.AXIOS).to(AxiosHttpGateway);

ENGINE_MODULE.bind(ENGINE_REGISTRY.GATEWAY.CMS.SANITY).toDynamicValue(
  SANITY_CLIENT,
);

ENGINE_MODULE.bind(ENGINE_REGISTRY.AUTH.JWT).toConstantValue(JWT_ENGINE);

export const { lazyInject: injectEngine } = lazy(ENGINE_MODULE);
