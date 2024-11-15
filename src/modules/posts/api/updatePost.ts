import { requestBuilder } from "@modules/core/utils";

export const updatePost = requestBuilder({
  url: '/posts/{id}',
  method: 'patch'
});

export type UpdatePostParams = Parameters<typeof updatePost>[0];