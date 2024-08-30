import { MODULES } from '@/@module/app.facotry';
import { IDeleteTutorialDTO } from '@/@module/domain/DTO/tutorial/delete.dto';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useTutorialDeletion = () => {
  const result = MODULES.APPLICATION.CONTROLLER.TUTORIAL();

  const {
    mutate: remove,
    mutateAsync: removeAsync,
    data,
    isPending,
    error,
  } = useMutation<boolean, any, IDeleteTutorialDTO>({
    mutationFn: async DTO =>
      await toast.promise(result.delete(DTO), {
        loading: `Deleting tutorial... 🗑️`,
        success: `Tutorial deleted! 🎉`,
        error: `Tutorial deletion failed! ❌`,
      }),
  });

  return {
    create: remove,
    createAsync: removeAsync,
    data,
    isPending,
    error,
  };
};
