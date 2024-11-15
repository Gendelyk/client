import { requestBuilder } from "@modules/core/utils";

export const createPost = requestBuilder({
  url: '/posts',
  method: 'post'
});

export type CreatePostParams = Parameters<typeof createPost>[0];