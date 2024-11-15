import { requestBuilder } from "@modules/core/utils";

export const updateComment = requestBuilder({
  url: '/comments/{id}',
  method: 'patch'
});

export type UpdateCommentParams = Parameters<typeof updateComment>[0];

export type UpdateCommentReturnType = ReturnType<typeof updateComment>;