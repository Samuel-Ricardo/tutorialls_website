import { ENGINE_MODULE } from '@/@module/infra/engine/engine.module';
import { Container } from 'inversify';

import lazy from 'inversify-inject-decorators';
import { SanityCMSGateway } from './cms/sanity/sanity.gateway';
import { GATEWAY_REGISTRY } from './gateway.registry';
import { AxiosHttpAuthGateway } from './http/axios/user/auth.gateway';
import { AxiosHttpTutorialGateway } from './http/axios/tutorial/tutorial.gateway';

const _MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export const GATEWAY_MODULE = Container.merge(_MODULE, ENGINE_MODULE);

GATEWAY_MODULE.bind(GATEWAY_REGISTRY.CMS.SANITY).to(SanityCMSGateway);

GATEWAY_MODULE.bind(GATEWAY_REGISTRY.HTTP.AXIOS.AUTH).to(AxiosHttpAuthGateway);

GATEWAY_MODULE.bind(GATEWAY_REGISTRY.HTTP.AXIOS.TUTORIAL).to(
  AxiosHttpTutorialGateway,
);

export const { lazyInject: injectGateway } = lazy(GATEWAY_MODULE);
