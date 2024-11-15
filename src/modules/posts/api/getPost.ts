import { requestBuilder } from "@modules/core/utils";

export const getPost = requestBuilder({
  url: '/posts/{id}',
  method: 'get'
});

export type GetPostParams = Parameters<typeof getPost>[0];
export type GetPostReturnType = Awaited<ReturnType<typeof getPost>>;