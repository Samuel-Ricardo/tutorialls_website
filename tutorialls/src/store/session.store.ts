'use client';

import { MODULES } from '@/@module/app.facotry';
import { IUserDTO } from '@/@module/domain/DTO/user.dto';
import { GlobalSession } from '@/global/session.global';
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
  isAuthenticated: () =>
    typeof window !== 'undefined'
      ? !!localStorage?.getItem('AUTH_TOKEN')
      : false,
  refresh: async () => {
    if (typeof window === 'undefined') return;
    try {
      const token = localStorage?.getItem('AUTH_TOKEN') || '';
      const { user } = await MODULES.APPLICATION.CONTROLLER.AUTH().decode({
        token,
      });

      set({ user });
      GlobalSession.user = user;

      toast.dismiss();
      toast.success('Welcome back! 🙂');
    } catch (e) {
      set({ user: undefined });
      toast.dismiss();
      toast.error('Session expired. Please login again. 😢');
    }
  },
  logout: () => {
    set({ user: undefined });
    localStorage?.removeItem('AUTH_TOKEN');
  },
}));

export default useSessionStore;
