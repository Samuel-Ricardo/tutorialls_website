'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { FormField } from './field/field.component';
import { Button } from '../button/button.component';
import { useRegister } from '@/hook/auth/signup.hook';
import {
  ISignupForm,
  signupFormSchema,
} from '@/validation/zod/form/signup.schema';
import useSignupModalStore from '@/store/modal/signup.store';

export const SignupForm = () => {
  const { signupAsync } = useRegister();
  const { closeModal } = useSignupModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>({
    resolver: zodResolver(signupFormSchema),
  });

  const submit = useCallback(
    () =>
      handleSubmit(async data => {
        await signupAsync(data);
        closeModal();
      }),
    [handleSubmit, signupAsync, closeModal],
  );

  return (
    <form onSubmit={submit()} className="flex flex-col gap-8 my-10 w-full">
      <FormField
        label={{
          id: 'lbl_email',
          defaultValue: 'Email',
        }}
        type="email"
        placeholder="john.doe@example.com"
        hook={register('email')}
        error={errors.email?.message}
      />

      <FormField
        label={{
          id: 'lbl_password',
          defaultValue: 'Password',
        }}
        type="password"
        placeholder="********"
        hook={register('password')}
        error={errors.password?.message}
      />

      <Button id="btn_signup" label="signup" type="submit" />
    </form>
  );
};
