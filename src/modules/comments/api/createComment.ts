import { requestBuilder } from "@modules/core/utils";

export const createComment = requestBuilder({
  url: '/comments',
  method: 'post'
});

export type CreateCommentParams = Parameters<typeof createComment>[0];

export type CreateCommentReturnType = ReturnType<typeof createComment>;