import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { ErrorOutput } from '@modules/core/types/error-output';
import { hasErrors } from '@modules/core/utils';
import { createPost, CreatePostParams, CreatePostReturnType } from '../api';

export type CreatePost = (
  params: CreatePostParams,
) => Promise<CreatePostReturnType | undefined>;

export type UseCreatePostReturnType = {
  isLoading: boolean;
  createPost: CreatePost;
};

export const useCreatePost = (): UseCreatePostReturnType => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPost,
  });

  const handleCreatePost: CreatePost = useCallback(
    async (data) => {
      try {
        const response = await mutateAsync(data);
        console.log(response)
        return response;    
      } catch (error) {        
        console.error(error);
      }
    },
    [mutateAsync],
  );

  return {
    createPost: handleCreatePost,
    isLoading: isPending,
  };
};
