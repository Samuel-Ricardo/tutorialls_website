import { MODULE } from '@/@module/app.registry';
import { ENV_TYPE } from '@/@type/module/infra/config/env.type';
import { interfaces } from 'inversify';
import { createClient } from 'next-sanity';

export const SANITY_CLIENT = ({ container }: interfaces.Context) => {
  const ENV = container.get<ENV_TYPE>(MODULE.INFRA.CONFIG.ENV);

  return createClient({
    projectId: ENV.SANITY.PROJECT.ID,
    dataset: ENV.SANITY.DATASET,
    useCdn: ENV.SANITY.USE.CDN,
  });
};
