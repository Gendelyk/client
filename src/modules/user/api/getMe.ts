import { requestBuilder } from "@modules/core/utils";

export const getMe = requestBuilder({
  url: '/users/me',
  method: 'get',
});

export type GetMeReturnType = Awaited<ReturnType<typeof getMe>>