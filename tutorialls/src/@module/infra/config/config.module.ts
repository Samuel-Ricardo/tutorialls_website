import { Container } from 'inversify';
import { CONFIG_REGISTRY } from './config.registry';
import { CONFIG } from './app/app.config';

import lazy from 'inversify-inject-decorators';

export const CONFIG_MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

CONFIG_MODULE.bind(CONFIG_REGISTRY.CONFIG).toConstantValue(CONFIG);
CONFIG_MODULE.bind(CONFIG_REGISTRY.ENV).toConstantValue(CONFIG.ENV);

CONFIG_MODULE.bind(CONFIG_REGISTRY.API.URL).toConstantValue(CONFIG.ENV.API.URL);
CONFIG_MODULE.bind(CONFIG_REGISTRY.ENCRYPTION.KEY).toConstantValue(
  CONFIG.ENV.ENCRYPTION.KEY,
);
CONFIG_MODULE.bind(CONFIG_REGISTRY.ENCRYPTION.ALGORITHM).toConstantValue(
  CONFIG.ENV.ENCRYPTION.ALGORITHM,
);
CONFIG_MODULE.bind(CONFIG_REGISTRY.ENCRYPTION.BREAKPOINT).toConstantValue(
  CONFIG.ENV.ENCRYPTION.BREAKPOINT,
);

CONFIG_MODULE.bind(CONFIG_REGISTRY.JWT.SECRET).toConstantValue(
  CONFIG.ENV.JWT.SECRET,
);

CONFIG_MODULE.bind(CONFIG_REGISTRY.SANITY.PROJECT.ID).toConstantValue(
  CONFIG.ENV.SANITY.PROJECT.ID,
);
CONFIG_MODULE.bind(CONFIG_REGISTRY.SANITY.DATASET).toConstantValue(
  CONFIG.ENV.SANITY.DATASET,
);
CONFIG_MODULE.bind(CONFIG_REGISTRY.SANITY.USE.CDN).toConstantValue(
  CONFIG.ENV.SANITY.USE.CDN,
);

export const { lazyInject: injectConfig } = lazy(CONFIG_MODULE);
