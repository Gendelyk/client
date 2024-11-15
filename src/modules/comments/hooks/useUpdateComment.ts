import { useMutation } from "@tanstack/react-query"
import { updateComment, UpdateCommentParams } from "../api"
import { useCallback } from "react";
import { ErrorOutput } from "@modules/core/types/error-output";
import { hasErrors } from "@modules/core/utils";

type UpdateComment = (
  params: UpdateCommentParams
) => Promise<ErrorOutput<UpdateCommentParams> | undefined>;

type UseUpdateCommentReturnType = {
  isLoading: boolean,
  createComment: UpdateComment
};

export const useUpdateComment = (): UseUpdateCommentReturnType => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateComment
  });

  const handleUpdateComment: UpdateComment = useCallback(async (data) => {
    const response = await mutateAsync(data);

    if (hasErrors(response)) {
      return response;
    }
  }, [mutateAsync]);

  return {
    isLoading: isPending,
    createComment: handleUpdateComment
  }
}