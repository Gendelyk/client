import { ErrorOutput } from "@modules/core/types/error-output";
import { updateUser, UpdateUserParams } from "../api";
import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "@modules/categories/api";
import { useCallback } from "react";
import { hasErrors } from "@modules/core/utils";

export type UpdateUser = (
  params: UpdateUserParams
) => Promise<ErrorOutput<UpdateUserParams> | undefined>;

export type UseUpdateUserReturnType = {
  isLoading: boolean,
  updateUser: UpdateUser
};

export const useUpdateUser = (): UseUpdateUserReturnType => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser
  });

  const handleUpdateUser: UpdateUser = useCallback(
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
    isLoading: isPending,
    updateUser: handleUpdateUser
  };
}