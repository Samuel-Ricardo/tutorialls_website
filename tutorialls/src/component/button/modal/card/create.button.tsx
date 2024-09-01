'use client';

import useCreateTutorialModalStore from '@/store/modal/card/create.store';
import { Button } from '../../button.component';

export const ToggleCreateTutorialModalButton = () => {
  const { toggleModal } = useCreateTutorialModalStore();

  return (
    <Button
      id="btn_create_tutorial_modal"
      label="Create Tutorial 🚀"
      onClick={toggleModal}
    />
  );
};
