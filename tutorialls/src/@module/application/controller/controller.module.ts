import { Container } from 'inversify';
import { SERVICE_MODULE } from '../service/service.module';
import { CONTROLLER_REGISTRY } from './controller.registry';
import { AuthController } from './user/auth.controller';
import { TutorialController } from './tutorial/tutorial.controller';

const _MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export const CONTROLLER_MODULE = Container.merge(_MODULE, SERVICE_MODULE);

CONTROLLER_MODULE.bind(CONTROLLER_REGISTRY.AUTH).to(AuthController);
CONTROLLER_MODULE.bind(CONTROLLER_REGISTRY.TUTORIAL).to(TutorialController);
