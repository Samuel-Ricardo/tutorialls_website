'use client';

import useUpdateCardModalStore from '@/store/modal/card/update.store';
import { Button } from '../../button.component';
import { CiEdit } from 'react-icons/ci';
import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';

export const UpdateCardButton = ({ data }: { data?: ITutorialDTO }) => {
  const { toggleModal } = useUpdateCardModalStore();

  return (
    <Button onClick={() => toggleModal(data)}>
      <CiEdit />
    </Button>
  );
};
