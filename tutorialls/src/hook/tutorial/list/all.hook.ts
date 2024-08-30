import { MODULES } from '@/@module/app.facotry';
import { IFilterTutorialsByAuthorDTO } from '@/@module/domain/DTO/tutorial/filter/by/author.dto';
import { IListAllTutorialsDTO } from '@/@module/domain/DTO/tutorial/list/all.dto';
import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useTutorialFilterByTitle = () => {
  const MODULE = MODULES.APPLICATION.CONTROLLER.TUTORIAL();

  const {
    mutate: listAll,
    mutateAsync: listAllAsync,
    data,
    isPending,
    error,
  } = useMutation<
    IPaginationOutputDTO<ITutorialDTO>,
    any,
    IListAllTutorialsDTO
  >({
    mutationFn: async DTO =>
      await toast.promise(MODULE.listAll(DTO), {
        loading: `Listing tutorials... 🌌`,
        success: `Listed tutorials! 🎉`,
        error: `Listing tutorials failed! 🐛`,
      }),
  });

  return {
    listAll,
    listAllAsync,
    data,
    isPending,
    error,
  };
};
