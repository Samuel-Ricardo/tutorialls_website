import { ENGINE_MODULE } from '@/@module/infra/engine/engine.module';
import { Container } from 'inversify';

import lazy from 'inversify-inject-decorators';
import { SanityCMSGateway } from './cms/sanity/sanity.gateway';
import { GATEWAY_REGISTRY } from './gateway.registry';

const _MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export const GATEWAY_MODULE = Container.merge(_MODULE, ENGINE_MODULE);

GATEWAY_MODULE.bind(GATEWAY_REGISTRY.CMS.SANITY).to(SanityCMSGateway);

export const { lazyInject: injectGateway } = lazy(GATEWAY_MODULE);
