import { MODULES } from '@/@module/app.facotry';
import { ICreateTutorialDTO } from '@/@module/domain/DTO/tutorial/create.dto';
import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useTutorialCreation = () => {
  const result = MODULES.APPLICATION.CONTROLLER.TUTORIAL();

  const {
    mutate: create,
    mutateAsync: createAsync,
    data,
    isPending,
    error,
  } = useMutation<ITutorialDTO, any, ICreateTutorialDTO>({
    mutationFn: async DTO =>
      await toast.promise(result.create(DTO), {
        loading: `Creating tutorial... 🛂`,
        success: `Tutorial created! 🎉`,
        error: `Tutorial creation failed! ❌`,
      }),
  });

  return {
    create,
    createAsync,
    data,
    isPending,
    error,
  };
};
