'use client';

import { Button } from '../button.component';
import { useTutorialDeletion } from '@/hook/tutorial/delete.hook';
import { useCallback } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';

export const DeleteCardButton = ({ key: id }: { key: string }) => {
  const { remove } = useTutorialDeletion();
  const onClick = useCallback(() => remove({ id }), [remove, id]);

  return (
    <Button onClick={() => onClick()}>
      <RiDeleteBin5Line />
    </Button>
  );
};
