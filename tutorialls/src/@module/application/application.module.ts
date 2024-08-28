import { Container } from 'inversify';
import { GATEWAY_MODULE } from './gateway/gateway.module';

import lazy from 'inversify-inject-decorators';

const _MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export const APPLICATION_MODULE = Container.merge(_MODULE, GATEWAY_MODULE);

export const { lazyInject: injectApplication } = lazy(APPLICATION_MODULE);
