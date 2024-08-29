import { CONFIG_FACTORY } from './config/config.factory';
import { ENGINE_FACTORY } from './engine/engine.factory';

export const INFRA_FACTORY = {
  ENGINE: ENGINE_FACTORY,
  CONFIG: CONFIG_FACTORY,
};
