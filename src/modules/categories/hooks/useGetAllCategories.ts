'use client'

import { getAllCategories, GetAllCategoriesReturnType } from "../api"
import { useQuery } from "@tanstack/react-query";

type Categories = Extract<GetAllCategoriesReturnType['data'], { id: number }[]>;

type UseGetAllCategoriesReturnType = {
  isLoading: boolean,
  categories: Categories | null
}

export const useGetAllCategories = (): UseGetAllCategoriesReturnType => {
  const { data, isLoading } = useQuery({
    queryKey: ['allCategories'],
    queryFn: () => getAllCategories({})
  });

  return {
    isLoading,
    categories: (data?.data ?? null) as Categories | null
  }
}