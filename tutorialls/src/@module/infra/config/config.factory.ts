import { CONFIG_TYPE } from '@/@type/module/infra/config/config.type';
import { ENV_TYPE } from '@/@type/module/infra/config/env.type';
import { CONFIG_MODULE } from './config.module';
import { CONFIG_REGISTRY } from './config.registry';

export const CONFIG_FACTORY = {
  CONFIG: CONFIG_MODULE.get<CONFIG_TYPE>(CONFIG_REGISTRY.CONFIG),
  ENV: CONFIG_MODULE.get<ENV_TYPE>(CONFIG_REGISTRY.ENV),
  API: {
    URL: CONFIG_MODULE.get<string | undefined>(CONFIG_REGISTRY.API.URL),
  },
  ENCRYPTION: {
    KEY: CONFIG_MODULE.get<string | undefined>(CONFIG_REGISTRY.ENCRYPTION.KEY),
    ALGORITHM: CONFIG_MODULE.get<string | undefined>(
      CONFIG_REGISTRY.ENCRYPTION.ALGORITHM,
    ),
    BREAKPOINT: CONFIG_MODULE.get<string | undefined>(
      CONFIG_REGISTRY.ENCRYPTION.BREAKPOINT,
    ),
  },
};
