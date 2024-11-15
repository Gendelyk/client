import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { ErrorOutput } from '@modules/core/types/error-output';
import { hasErrors } from '@modules/core/utils';
import { createCategory, CreateCategoryParams } from '../api';

export type CreateCategory = (
  params: CreateCategoryParams,
) => Promise<ErrorOutput<CreateCategoryParams> | undefined>;

export type UseCreateCategoryReturnType = {
  isLoading: boolean;
  createCategory: CreateCategory;
};

export const useCreateCategory = (): UseCreateCategoryReturnType => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCategory,
  });

  const handleCreateCategory: CreateCategory = useCallback(
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
    createCategory: handleCreateCategory,
    isLoading: isPending,
  };
};
