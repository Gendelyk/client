import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { ErrorOutput } from '@modules/core/types/error-output';
import { hasErrors } from '@modules/core/utils';
import { createRating, CreateRatingParams } from '../api';

export type CreateRating = (
  params: CreateRatingParams,
) => Promise<ErrorOutput<CreateRatingParams> | undefined>;

export type UseCreateRatingReturnType = {
  isLoading: boolean;
  createRating: CreateRating;
};

export const useCreateRating = (): UseCreateRatingReturnType => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createRating,
  });

  const handleCreateRating: CreateRating = useCallback(
    async (data) => {
      try {
        const response = await mutateAsync(data);

        if (hasErrors(response)) {
          return response;
        }        
      } catch (error) {
        console.error(error);
      }
    },
    [mutateAsync],
  );

  return {
    createRating: handleCreateRating,
    isLoading: isPending,
  };
};
