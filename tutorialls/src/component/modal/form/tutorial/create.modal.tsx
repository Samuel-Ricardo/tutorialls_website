'use client';

import { CreateTutorialForm } from '@/component/form/tutorial/create.format';
import { LazyParagraph } from '@/component/lazy/paragraph.component';
import { H1 } from '@/component/typography/h1.component';
import useCreateTutorialModalStore from '@/store/modal/card/create.store';
import { Modal } from '../../modal.component';

export const CreateTutorialModal = () => {
  const { isOpen, closeModal } = useCreateTutorialModalStore();

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <H1>
        <LazyParagraph id="lbl_create_tutorial" defaultValue="Tutorial" />
      </H1>

      <CreateTutorialForm />
    </Modal>
  );
};
