import 'reflect-metadata';

import { INFRA_FACTORY } from './infra/infra.factory';
import { APPLICATION_FACTORY } from './application/application.factory';

export const MODULES = {
  INFRA: INFRA_FACTORY,
  APPLICATION: APPLICATION_FACTORY,
};
