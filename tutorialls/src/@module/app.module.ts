import 'reflect-metadata';

import { Container } from 'inversify';
import { INFRA_MODULE } from './infra/infra.module';

const _MODULE = new Container({
  autoBindInjectable: true,
});

export const APP_MODULE = Container.merge(_MODULE, INFRA_MODULE);
