'use client';

import useSessionStore from '@/store/session.store';
import { useRouter } from 'next/navigation';

export const AuthWall = ({ children }: { children: React.ReactNode }) => {
  const { refresh, isAuthenticated } = useSessionStore();
  refresh();
  const { push } = useRouter();

  if (!isAuthenticated()) {
    push('/login');
  }

  return <>{children}</>;
};
