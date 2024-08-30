import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import create from 'zustand';

interface UpdateCardModalStore {
  data: ITutorialDTO | undefined;
  isOpen: boolean;
  openModal: (data: ITutorialDTO) => void;
  closeModal: () => void;
  toggleModal: (data?: ITutorialDTO) => void;
}

const useUpdateCardModalStore = create<UpdateCardModalStore>(set => ({
  data: undefined,
  isOpen: false,
  openModal: (data: ITutorialDTO) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: (data?: ITutorialDTO) =>
    set(state => ({ isOpen: !state.isOpen, data })),
}));

export default useUpdateCardModalStore;
