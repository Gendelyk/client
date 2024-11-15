import { requestBuilder } from "@modules/core/utils";

export const createRating = requestBuilder({
  url: '/ratings',
  method: 'post'
});

export type CreateRatingParams = Parameters<typeof createRating>[0];