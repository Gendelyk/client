'use client'

import { getRating, GetRatingParams, GetRatingReturnType } from "../api"
import { useQuery } from "@tanstack/react-query";

type Rating = Extract<GetRatingReturnType['data'], { id: number }>;

type UseGetRatingReturnType = {
  isLoading: boolean,
  ratings: Rating | null
}

export const useGetRating = (id: number): UseGetRatingReturnType => {
  const params: GetRatingParams = {
    path: {
      id
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ['currentRating'],
    queryFn: () => getRating(params)
  });

  return {
    isLoading,
    ratings: (data?.data ?? null) as Rating | null
  }
}