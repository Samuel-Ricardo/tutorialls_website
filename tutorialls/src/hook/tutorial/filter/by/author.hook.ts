import { MODULES } from '@/@module/app.facotry';
import { IFilterTutorialsByAuthorDTO } from '@/@module/domain/DTO/tutorial/filter/by/author.dto';
import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useTutorialFilterByAuthor = () => {
  const MODULE = MODULES.APPLICATION.CONTROLLER.TUTORIAL();

  const {
    mutate: filterByAuthor,
    mutateAsync: filterByAuthorAsync,
    data,
    isPending,
    error,
  } = useMutation<
    IPaginationOutputDTO<ITutorialDTO>,
    any,
    IFilterTutorialsByAuthorDTO
  >({
    mutationFn: async DTO =>
      await toast.promise(MODULE.filterByAuthor(DTO), {
        loading: `Filtering tutorials... 🚀`,
        success: `Filtered tutorials! 🎉`,
        error: `Filtering tutorials failed! ❌`,
      }),
  });

  return {
    filterByAuthor,
    filterByAuthorAsync,
    data,
    isPending,
    error,
  };
};
