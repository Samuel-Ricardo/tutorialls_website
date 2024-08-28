import { Container } from 'inversify';
import { AuthService } from './user/auth.service';
import { SERVICE_REGISTRY } from './service.registry';

export const SERVICE_MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

SERVICE_MODULE.bind(SERVICE_REGISTRY.USER.AUTH).to(AuthService);
