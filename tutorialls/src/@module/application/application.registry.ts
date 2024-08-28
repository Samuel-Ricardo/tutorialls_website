import { GATEWAY_REGISTRY } from './gateway/gateway.registry';
import { SERVICE_REGISTRY } from './service/service.registry';
import { USE_CASE_REGISTRY } from './use_case/use_case.registry';

export const APPLICATION_REGISTRY = {
  GATEWAY: GATEWAY_REGISTRY,
  USE_CASE: USE_CASE_REGISTRY,
  SERVICE: SERVICE_REGISTRY,
};
