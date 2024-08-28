import { SERVICE_MODULE } from './service.module';
import { SERVICE_REGISTRY } from './service.registry';
import { AuthService } from './user/auth.service';

export const SERVICE_FACTORY = {
  USER: {
    AUTH: () => SERVICE_MODULE.get<AuthService>(SERVICE_REGISTRY.USER.AUTH),
  },
};
