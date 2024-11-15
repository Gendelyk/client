import { requestBuilder } from "@modules/core/utils";

export const createCategory = requestBuilder({
  url: '/categories',
  method: 'post'
});

export type CreateCategoryParams = Parameters<typeof createCategory>[0];