'use client';

import useSignupModalStore from '@/store/modal/signup.store';
import { IoCloseOutline } from 'react-icons/io5';

export const SignupModal = () => {
  const { isOpen, closeModal } = useSignupModalStore();
  if (!isOpen) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed flex justify-center items-center h-screen w-screen bg-[#76ff0208] backdrop-blur-lg top-0 left-0"
    >
      <IoCloseOutline
        onClick={closeModal}
        className="text-[#76ff02] cursor-pointer hover:scale-150 text-4xl ease-in-out duration-300 fixed top-10 right-10"
      />

      <div className="bg-black/90 h-fit w-fit"></div>
    </div>
  );
};
