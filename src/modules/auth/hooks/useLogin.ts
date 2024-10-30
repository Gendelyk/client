import { queryClient } from '@core/queryClient';
import { getMe } from '@modules/user/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { login, LoginParams } from '../api/login';
import { ErrorOutput } from '@modules/core/types/error-output';
import { hasErrors } from '@modules/core/utils';

export type Login = (
  params: LoginParams,
) => Promise<ErrorOutput<LoginParams> | undefined>;

export type UseLoginReturnType = {
  isLoading: boolean;
  login: Login;
};

export const useLogin = (): UseLoginReturnType => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
  });

  const handleLogin: Login = useCallback(
    async (data) => {
      try {
        const response = await mutateAsync(data);

        if (hasErrors(response)) {
          return response;
        }

        const user = await getMe({});

        queryClient.setQueryData(['currentUser'], user);
      } catch (error) {
        console.error(error);
      }
    },
    [mutateAsync],
  );

  return {
    login: handleLogin,
    isLoading: isPending,
  };
};
