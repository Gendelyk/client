import { requestBuilder } from "@modules/core/utils";

export const getAllCategories = requestBuilder({
  url: '/categories',
  method: 'get'
});

export type GetAllCategoriesParams = Parameters<typeof getAllCategories>[0];
export type GetAllCategoriesReturnType = Awaited<ReturnType<typeof getAllCategories>>;