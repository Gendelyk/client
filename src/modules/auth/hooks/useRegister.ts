import { queryClient } from '@core/queryClient';
import { getMe } from '@modules/user/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { ErrorOutput } from '@modules/core/types/error-output';
import { hasErrors } from '@modules/core/utils';
import { register, RegisterParams } from '../api';

export type Register = (
  params: RegisterParams,
) => Promise<ErrorOutput<RegisterParams> | undefined>;

export type UseRegisterReturnType = {
  isLoading: boolean;
  register: Register;
};

export const useRegister = (): UseRegisterReturnType => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: register,
  });

  const handleRegister: Register = useCallback(
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
    register: handleRegister,
    isLoading: isPending,
  };
};
