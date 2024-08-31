'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';

import { Button } from '@/component/button/button.component';
import { FormField } from '../field/field.component';
import { useTutorialCreation } from '@/hook/tutorial/create.hook';
import useCreateTutorialModalStore from '@/store/modal/card/create.store';
import {
  createTutorialFormSchema,
  ICreateTutorialForm,
} from '@/validation/zod/form/card/create.schema';

export const CreateTutorialForm = () => {
  const { createAsync } = useTutorialCreation();
  const { closeModal } = useCreateTutorialModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTutorialForm>({
    resolver: zodResolver(createTutorialFormSchema),
  });

  const submit = useCallback(
    () =>
      handleSubmit(async data => {
        const result = await createAsync(data);
        if (result) closeModal();
      }),
    [handleSubmit, createAsync, closeModal],
  );

  return (
    <form onSubmit={submit()} className="flex flex-col gap-8 my-10 w-full">
      <FormField
        label={{
          id: 'lbl_title',
          defaultValue: 'Title',
        }}
        type="text"
        placeholder="My first NestJS tutorial :D"
        hook={register('title')}
        error={errors.title?.message}
      />

      <FormField
        label={{
          id: 'lbl_content',
          defaultValue: 'Content',
        }}
        type="text"
        placeholder="This tutorial will help you to understand NestJS..."
        hook={register('content')}
        error={errors.content?.message}
      />
      <FormField
        label={{
          id: 'lbl_author',
          defaultValue: 'Author',
        }}
        type="text"
        placeholder="Samuel"
        hook={register('author')}
        error={errors.title?.message}
      />

      <Button id="btn_create_tutorial_subtmit" label="Create" type="submit" />
    </form>
  );
};
