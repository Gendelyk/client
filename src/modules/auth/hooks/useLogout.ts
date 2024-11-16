import { queryClient } from '@core/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { logout } from '../api';
import { useRouter } from 'next/navigation';

export type UseLogoutReturnType = {
  isLoading: boolean;
  logout: () => Promise<void>;
};

export const useLogout = (): UseLogoutReturnType => {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: logout,
  });

  const handleLogout = useCallback(async () => {
    await mutateAsync({});
    queryClient.setQueryData(['currentUser'], null);
    queryClient.clear();
    router.replace('/login');
  }, [mutateAsync, router]);

  return {
    logout: handleLogout,
    isLoading: isPending,
  };
};
