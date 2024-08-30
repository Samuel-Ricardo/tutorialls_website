import { MODULES } from '@/@module/app.facotry';
import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { IUpdateTutorialDTO } from '@/@module/domain/DTO/tutorial/update.dto';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useTutorialDeletion = () => {
  const MODULE = MODULES.APPLICATION.CONTROLLER.TUTORIAL();

  const {
    mutate: update,
    mutateAsync: updateAsync,
    data,
    isPending,
    error,
  } = useMutation<ITutorialDTO, any, IUpdateTutorialDTO>({
    mutationFn: async DTO =>
      await toast.promise(MODULE.update(DTO), {
        loading: `Updating tutorial... 🌱`,
        success: `Tutorial updated! 🎉`,
        error: `Tutorial updated failed! ❌`,
      }),
  });

  return {
    update,
    updateAsync,
    data,
    isPending,
    error,
  };
};
