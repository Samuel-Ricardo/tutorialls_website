'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';

import { Button } from '@/component/button/button.component';
import { FormField } from '../field/field.component';
import { useTutorialUpdate } from '@/hook/tutorial/update.hook';
import useCreateTutorialModalStore from '@/store/modal/card/create.store';
import {
  createTutorialFormSchema,
  ICreateTutorialForm,
} from '@/validation/zod/form/card/create.schema';
import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { FormTextArea } from '../field/text_area.component';
import { useRouter } from 'next/navigation';

export const UpdateTutorialForm = ({
  tutorial,
}: {
  tutorial?: ITutorialDTO;
}) => {
  const { updateAsync, error } = useTutorialUpdate();
  const { closeModal } = useCreateTutorialModalStore();
  const { refresh } = useRouter();

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
        await updateAsync({ id: tutorial?.id, ...data });
        if (!error) {
          refresh();
          closeModal();
        }
      }),
    [handleSubmit, updateAsync, closeModal, error, tutorial?.id, refresh],
  );

  return (
    <form onSubmit={submit()} className="flex flex-col gap-8 my-10 w-full">
      <FormField
        label={{
          id: 'lbl_title',
          defaultValue: 'Title',
        }}
        defaultValue={tutorial?.title}
        type="text"
        placeholder="My first NestJS tutorial :D"
        hook={register('title')}
        error={errors.title?.message}
      />

      <FormTextArea
        label={{
          id: 'lbl_content',
          defaultValue: 'Content',
        }}
        defaultValue={tutorial?.content}
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
        defaultValue={tutorial?.author}
        type="text"
        placeholder="Samuel"
        hook={register('author')}
        error={errors.title?.message}
      />

      <Button id="btn_update_tutorial_subtmit" label="Update" type="submit" />
    </form>
  );
};
