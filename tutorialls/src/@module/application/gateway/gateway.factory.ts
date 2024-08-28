import { ICMSGateway } from '@/@module/infra/engine/gateway/cms/cms.gateway';
import { GATEWAY_MODULE } from './gateway.module';
import { GATEWAY_REGISTRY } from './gateway.registry';

export const GATEWAY_FACTORY = {
  CMS: {
    SANITY: () => GATEWAY_MODULE.get<ICMSGateway>(GATEWAY_REGISTRY.CMS.SANITY),
  },
};
