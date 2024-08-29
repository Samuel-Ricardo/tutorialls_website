'use client';

import useSessionStore from '@/store/session.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AuthWall = ({ children }: { children?: React.ReactNode }) => {
  const { refresh, isAuthenticated } = useSessionStore();
  const { push } = useRouter();

  useEffect(() => {
    refresh();
    if (!isAuthenticated()) {
      push('/login');
    }
  }, [refresh, isAuthenticated, push]);

  return <>{children}</>;
};
