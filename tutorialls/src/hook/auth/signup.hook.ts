import { MODULES } from '@/@module/app.facotry';
import { ISignupUserDTO } from '@/@module/domain/DTO/user/signup.dto';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useRegister = () => {
  const MODULE = MODULES.APPLICATION.CONTROLLER.AUTH();

  const {
    mutate: signup,
    mutateAsync: signupAsync,
    data,
    isPending,
    error,
  } = useMutation<{ success: boolean }, any, ISignupUserDTO>({
    mutationFn: async DTO =>
      await toast.promise(MODULE.signup(DTO), {
        loading: `Signing up... 🛂`,
        success: `Success! 🎉`,
        error: `Signup failed! ❌`,
      }),
  });

  return {
    signup,
    signupAsync,
    data,
    isPending,
    error,
  };
};
