'use client';

import { MODULES } from '@/@module/app.facotry';
import { IGetFromCMSDTO } from '@/@module/domain/DTO/infra/engine/cms/get.dto';
import { useQuery } from '@tanstack/react-query';

export const useImage = ({ id }: IGetFromCMSDTO) => {
  const cms = MODULES.APPLICATION.GATEWAY.CMS.SANITY();

  const { data, isPending, error, refetch } = useQuery<string>({
    queryFn: async () => cms.getImage({ id }),
    queryKey: ['paragraph_' + id],
  });

  return {
    data,
    isPending,
    error,
    refetch,
  };
};
