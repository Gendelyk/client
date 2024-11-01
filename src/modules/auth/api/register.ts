import { requestBuilder } from "@modules/core/utils";

export const register = requestBuilder({
  url: '/auth/register',
  method: 'post',
});

export type RegisterParams = Parameters<typeof register>[0];

export type RegisterReturnType = ReturnType<typeof register>;