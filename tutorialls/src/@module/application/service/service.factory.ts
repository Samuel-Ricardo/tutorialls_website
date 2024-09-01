import { SERVICE_MODULE } from './service.module';
import { SERVICE_REGISTRY } from './service.registry';
import { TutorialService } from './tutorial/tutorial.service';
import { AuthService } from './user/auth.service';

export const SERVICE_FACTORY = {
  USER: {
    AUTH: () => SERVICE_MODULE.get<AuthService>(SERVICE_REGISTRY.USER.AUTH),
  },
  TUTORIAL: () =>
    SERVICE_MODULE.get<TutorialService>(SERVICE_REGISTRY.TUTORIAL),
};
