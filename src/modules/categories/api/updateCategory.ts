import { requestBuilder } from "@modules/core/utils";

export const updateCategory = requestBuilder({
  url: '/categories/{id}',
  method: 'patch'
});

export type UpdateCategoryParams = Parameters<typeof updateCategory>[0];