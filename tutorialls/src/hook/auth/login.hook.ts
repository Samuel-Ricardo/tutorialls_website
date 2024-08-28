import { MODULES } from '@/@module/app.facotry';
import { ILoginUserDTO } from '@/@module/domain/DTO/user/login.dto';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const MODULE = MODULES.APPLICATION.CONTROLLER.AUTH();

  const {
    mutate: login,
    mutateAsync: loginAsync,
    data,
    isPending,
    error,
  } = useMutation<{ token: string }, any, ILoginUserDTO>({
    mutationFn: async DTO =>
      await toast.promise(MODULE.login(DTO), {
        loading: `Authenticating... 🛂`,
        success: `Logged in! 🎉`,
        error: `Authentication failed! ❌`,
      }),
  });

  return {
    login,
    loginAsync,
    data,
    isPending,
    error,
  };
};
