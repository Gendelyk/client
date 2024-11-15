import { requestBuilder } from "@modules/core/utils";

export const getRating = requestBuilder({
  url: '/ratings/{id}',
  method: 'get'
});

export type GetRatingParams = Parameters<typeof getRating>[0];
export type GetRatingReturnType = Awaited<ReturnType<typeof getRating>>;