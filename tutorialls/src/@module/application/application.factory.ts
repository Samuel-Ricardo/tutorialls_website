import { CONTROLLER_FACTORY } from './controller/controller.factory';
import { GATEWAY_FACTORY } from './gateway/gateway.factory';
import { USE_CASE_FACTORY } from './use_case/use_case.factory';

export const APPLICATION_FACTORY = {
  GATEWAY: GATEWAY_FACTORY,
  USE_CASE: USE_CASE_FACTORY,
  SERVICE: USE_CASE_FACTORY,
  CONTROLLER: CONTROLLER_FACTORY,
};
