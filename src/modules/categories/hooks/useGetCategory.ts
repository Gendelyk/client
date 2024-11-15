'use client'

import { GetCategoryParams, GetCategoryReturnType, getCategory } from "../api"
import { useQuery } from "@tanstack/react-query";

type Category = Extract<GetCategoryReturnType['data'], { id: number }>;

type UseGetCategoryReturnType = {
  isLoading: boolean,
  category: Category | null
}

export const useGetCategory = (id: number): UseGetCategoryReturnType => {
  const params: GetCategoryParams = {
    path: {
      id
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ['currentCategory'],
    queryFn: () => getCategory(params)
  });

  return {
    isLoading,
    category: (data?.data ?? null) as Category | null
  }
}