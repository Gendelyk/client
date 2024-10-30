import { requestBuilder } from "@modules/core/utils";

export const login = requestBuilder({
  url: '/auth/login',
  method: 'post',
});


export type LoginParams = Parameters<typeof login>[0]

export type LoginReturnType = ReturnType<typeof login>