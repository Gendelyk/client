import { requestBuilder } from "@modules/core/utils";

export const getCategory = requestBuilder({
  url: '/categories/{id}',
  method: 'get'
});

export type GetCategoryParams = Parameters<typeof getCategory>[0];
export type GetCategoryReturnType = Awaited<ReturnType<typeof getCategory>>;