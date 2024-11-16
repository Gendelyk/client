import { requestBuilder } from "@modules/core/utils";

export const updateUser = requestBuilder({
  url: '/users/me',
  method: 'patch'
});

export type UpdateUserParams = Parameters<typeof updateUser>[0];