import { requestBuilder } from "@modules/core/utils";

export const logout = requestBuilder({
  url: '/auth/logout',
  method: 'post',
});

export type LogoutReturnType = ReturnType<typeof logout>