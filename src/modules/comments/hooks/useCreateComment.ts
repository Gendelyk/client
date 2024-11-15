import { useMutation } from "@tanstack/react-query"
import { createComment, CreateCommentParams } from "../api"
import { useCallback } from "react";
import { ErrorOutput } from "@modules/core/types/error-output";
import { hasErrors } from "@modules/core/utils";

type CreateComment = (
  params: CreateCommentParams
) => Promise<ErrorOutput<CreateCommentParams> | undefined>;

type UseCreateCommentReturnType = {
  isLoading: boolean,
  createComment: CreateComment
};

export const useCreateComment = (): UseCreateCommentReturnType => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createComment
  });

  const handleCreateComment: CreateComment = useCallback(async (data) => {
    const response = await mutateAsync(data);

    if (hasErrors(response)) {
      return response;
    }
  }, [mutateAsync]);

  return {
    isLoading: isPending,
    createComment: handleCreateComment
  }
}