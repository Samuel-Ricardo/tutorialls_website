'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ILoginForm } from '@/validation/zod/form/login.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/validation/zod/form/login.schema';
import { useCallback, useEffect } from 'react';
import { useAuth } from '@/hook/auth/login.hook';
import { FormField } from './field/field.component';
import { Button } from '../button/button.component';
import useSessionStore from '@/store/session.store';

export const LoginForm = () => {
  const router = useRouter();
  const { loginAsync } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  const submit = useCallback(
    () =>
      handleSubmit(async data => {
        const { token } = await loginAsync(data);
        localStorage.setItem('AUTH_TOKEN', token);
        router.push('/tutorials');
      }),
    [handleSubmit, loginAsync, router],
  );

  const { refresh, isAuthenticated } = useSessionStore();
  useEffect(() => {
    refresh();
    if (isAuthenticated()) router.push('/tutorials');
  }, [refresh, isAuthenticated, router]);

  return (
    <form onSubmit={submit()} className="flex flex-col gap-4 my-10">
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

      <Button id="btn_login" label="Login" type="submit" />
    </form>
  );
};
