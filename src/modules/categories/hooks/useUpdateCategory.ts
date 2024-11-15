import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { ErrorOutput } from '@modules/core/types/error-output';
import { hasErrors } from '@modules/core/utils';
import { updateCategory, UpdateCategoryParams } from '../api';

export type UpdateCategory = (
  params: UpdateCategoryParams,
) => Promise<ErrorOutput<UpdateCategoryParams> | undefined>;

export type UseUpdateCategoryReturnType = {
  isLoading: boolean;
  updateCategory: UpdateCategory;
};

export const useUpdateCategory = (): UseUpdateCategoryReturnType => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateCategory,
  });

  const handleUpdateCategory: UpdateCategory = useCallback(
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
    updateCategory: handleUpdateCategory,
    isLoading: isPending,
  };
};
