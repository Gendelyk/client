import { requestBuilder } from "@modules/core/utils";

export const logout = requestBuilder({
  url: '/auth/logout',
  method: 'post',
});


export type LoginParams = Parameters<typeof logout>[0]

export type LoginReturnType = ReturnType<typeof logout>