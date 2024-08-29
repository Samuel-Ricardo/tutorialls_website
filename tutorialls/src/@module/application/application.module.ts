import { Container } from 'inversify';
import { GATEWAY_MODULE } from './gateway/gateway.module';

import lazy from 'inversify-inject-decorators';
import { USE_CASE_MODULE } from './use_case/use_case.module';
import { SERVICE_MODULE } from './service/service.module';
import { CONTROLLER_MODULE } from './controller/controller.module';

export const APPLICATION_MODULE = Container.merge(
  GATEWAY_MODULE,
  USE_CASE_MODULE,
  SERVICE_MODULE,
  CONTROLLER_MODULE,
);

export const { lazyInject: injectApplication } = lazy(APPLICATION_MODULE);
