import { requestBuilder } from "@modules/core/utils";

export const getAllPosts = requestBuilder({
  url: '/posts',
  method: 'get'
});

export type GetAllPostsParams = Parameters<typeof getAllPosts>[0];

export type GetAllPostsReturnType = Awaited<ReturnType<typeof getAllPosts>>;