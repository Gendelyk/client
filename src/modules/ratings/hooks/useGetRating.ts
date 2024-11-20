'use client'

import { getRating, GetRatingParams, GetRatingReturnType } from "../api"
import { useQuery } from "@tanstack/react-query";

type Rating = Extract<GetRatingReturnType['data'], { id: number }>;

type UseGetRatingReturnType = {
  isLoading: boolean,
  myRating: Rating | null
}

export const useGetRating = (postId: number): UseGetRatingReturnType => {
  const params: GetRatingParams = {
    path: {
      id: postId
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ['currentRating', postId],
    queryFn: () => getRating(params),    
    staleTime: 0
  });

  return {
    isLoading,
    myRating: (data?.data ?? null) as Rating | null
  }
}