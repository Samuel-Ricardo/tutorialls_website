import { MODULES } from '@/@module/app.facotry';
import { IFilterTutorialsByTitleDTO } from '@/@module/domain/DTO/tutorial/filter/by/title.dto';
import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useTutorialFilterByTitle = () => {
  const MODULE = MODULES.APPLICATION.CONTROLLER.TUTORIAL();

  const {
    mutate: filterByTitle,
    mutateAsync: filterByTitleAsync,
    data,
    isPending,
    error,
  } = useMutation<
    IPaginationOutputDTO<ITutorialDTO>,
    any,
    IFilterTutorialsByTitleDTO
  >({
    mutationFn: async DTO => {
      toast.dismiss();
      return await toast.promise(MODULE.filterByTitle(DTO), {
        loading: `Filtering tutorials... 🚀`,
        success: `Filtered tutorials! 🎉`,
        error: `Filtering tutorials failed! 🐞`,
      });
    },
  });

  return {
    filterByTitle,
    filterByTitleAsync,
    data,
    isPending,
    error,
  };
};
