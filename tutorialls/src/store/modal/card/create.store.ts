import create from 'zustand';

interface CreateTutorialModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const useCreateTutorialModalStore = create<CreateTutorialModalStore>(set => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set(state => ({ isOpen: !state.isOpen })),
}));

export default useCreateTutorialModalStore;
