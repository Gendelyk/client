import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { ErrorOutput } from '@modules/core/types/error-output';
import { hasErrors } from '@modules/core/utils';
import { createPost, updatePost, UpdatePostParams } from '../api';

export type UpdatePost = (
  params: UpdatePostParams,
) => Promise<ErrorOutput<UpdatePostParams> | undefined>;

export type UseUpdatePostReturnType = {
  isLoading: boolean;
  updatePost: UpdatePost;
};

export const useUpdatePost = (): UseUpdatePostReturnType => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updatePost,
  });

  const handleUpdatePost: UpdatePost = useCallback(
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
    updatePost: handleUpdatePost,
    isLoading: isPending,
  };
};
