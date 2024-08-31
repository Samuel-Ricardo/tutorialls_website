'use client';

import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { Button } from '../button.component';
import { useTutorialDeletion } from '@/hook/tutorial/delete.hook';
import { useCallback } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';

export const DeleteCardButton = ({ data }: { data: ITutorialDTO }) => {
  const { remove } = useTutorialDeletion();
  const onClick = () => remove({ id: data.id! });

  return (
    <Button onClick={() => onClick()}>
      <RiDeleteBin5Line />
    </Button>
  );
};
