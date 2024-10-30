import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api';
import { User } from '../types';


export type UseCurrentUser = () => {
  isLoading: boolean;
  user: User | null;
};

// * Be careful to use isLoading as data is cached and re requested at the same time
export const useCurrentUser: UseCurrentUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getMe({}),
  });

  return {
    user: (data?.data ?? null) as User | null,
    isLoading,
  };
};
