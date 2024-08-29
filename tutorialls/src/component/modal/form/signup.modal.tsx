'use client';

import useSignupModalStore from '@/store/modal/signup.store';
import { SignupForm } from '../../form/signup.form';
import { LazyParagraph } from '../../lazy/paragraph.component';
import { H1 } from '../../typography/h1.component';
import { Modal } from '../modal.component';

export const SignupModal = () => {
  const { isOpen, closeModal } = useSignupModalStore();

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <H1>
        <LazyParagraph id="lbl_signup" defaultValue="Signup" />
      </H1>

      <SignupForm />
    </Modal>
  );
};
