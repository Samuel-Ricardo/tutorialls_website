import { SignupForm } from '@/component/form/signup.form';
import { LazyParagraph } from '@/component/lazy/paragraph.component';
import { H1 } from '@/component/typography/h1.component';
import useUpdateCardModalStore from '@/store/modal/card/update.store';
import { Modal } from '../../modal.component';

export const UpdateTutorialModal = () => {
  const { isOpen, closeModal } = useUpdateCardModalStore();

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <H1>
        <LazyParagraph id="lbl_update_tutorial" defaultValue="Tutorial" />
      </H1>

      <UpdateTutorialModal />
    </Modal>
  );
};