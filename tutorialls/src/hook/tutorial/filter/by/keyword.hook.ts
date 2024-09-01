import { MODULES } from '@/@module/app.facotry';
import { IFilterTutorialsByContentDTO } from '@/@module/domain/DTO/tutorial/filter/by/content.dto';
import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useTutorialFilterByKeyword = () => {
  const MODULE = MODULES.APPLICATION.CONTROLLER.TUTORIAL();

  const {
    mutate: filterByKeyword,
    mutateAsync: filterByKeywordAsync,
    data,
    isPending,
    error,
  } = useMutation<
    IPaginationOutputDTO<ITutorialDTO>,
    any,
    IFilterTutorialsByContentDTO
  >({
    mutationFn: async DTO =>
      await toast.promise(MODULE.filterByKeywordInContent(DTO), {
        loading: `Filtering tutorials... 🚀`,
        success: `Filtered tutorials! 🎉`,
        error: `Filtering tutorials failed! 🐜`,
      }),
  });

  return {
    filterByKeyword,
    filterByKeywordAsync,
    data,
    isPending,
    error,
  };
};
