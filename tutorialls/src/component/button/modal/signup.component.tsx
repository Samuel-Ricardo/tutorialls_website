'use client';

import { Button } from '../button.component';
import useSignupModalStore from '@/store/modal/signup.store';

export const ToggleSignupModalButton = () => {
  const { toggleModal } = useSignupModalStore();

  return <Button id="btn_signup_modal" label="SIGN UP" onClick={toggleModal} />;
};
