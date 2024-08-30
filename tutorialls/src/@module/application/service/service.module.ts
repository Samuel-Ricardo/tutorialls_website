import { Container } from 'inversify';
import { AuthService } from './user/auth.service';
import { SERVICE_REGISTRY } from './service.registry';
import { USE_CASE_MODULE } from '../use_case/use_case.module';
import { TutorialService } from './tutorial/tutorial.service';

export const _MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export const SERVICE_MODULE = Container.merge(_MODULE, USE_CASE_MODULE);

SERVICE_MODULE.bind(SERVICE_REGISTRY.USER.AUTH).to(AuthService);
SERVICE_MODULE.bind(SERVICE_REGISTRY.TUTORIAL).to(TutorialService);
