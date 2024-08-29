import { CONTROLLER_MODULE } from './controller.module';
import { CONTROLLER_REGISTRY } from './controller.registry';
import { AuthController } from './user/auth.controller';

export const CONTROLLER_FACTORY = {
  AUTH: () => CONTROLLER_MODULE.get<AuthController>(CONTROLLER_REGISTRY.AUTH),
};
