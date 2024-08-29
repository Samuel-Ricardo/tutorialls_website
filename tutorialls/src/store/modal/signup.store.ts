import create from 'zustand';

interface SignupModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const useSignupModalStore = create<SignupModalStore>(set => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set(state => ({ isOpen: !state.isOpen })),
}));

export default useSignupModalStore;
