import { MODULES } from '@/@module/app.facotry';
import { IUserDTO } from '@/@module/domain/DTO/user.dto';
import toast from 'react-hot-toast';
import create from 'zustand';

interface ISessionState {
  user: IUserDTO | undefined;
  isAuthenticated: () => boolean;
  refresh: () => void;
  logout: () => void;
}

const useSessionStore = create<ISessionState>(set => ({
  user: undefined,
  isAuthenticated: () => !!localStorage.getItem('AUTH_TOKEN'),
  refresh: async () => {
    try {
      const token = localStorage.getItem('AUTH_TOKEN') || '';
      const { user } = await MODULES.APPLICATION.CONTROLLER.AUTH().decode({
        token,
      });

      set({ user });
    } catch (e) {
      console.error(e);
      set({ user: undefined });
      localStorage.removeItem('AUTH_TOKEN');
      toast.error('Session expired. Please login again.');
    }
  },
  logout: () => {
    set({ user: undefined });
    localStorage.removeItem('AUTH_TOKEN');
  },
}));

export default useSessionStore;
