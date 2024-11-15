'use client'

import { getAllPosts, GetAllPostsParams, GetAllPostsReturnType } from "../api"
import { useQuery } from "@tanstack/react-query";

type Posts = Extract<GetAllPostsReturnType['data'], { id: number }[]>;

type UseGetAllPostsReturnType = {
  isLoading: boolean,
  posts: Posts | null
}

export const useGetAllPosts = (): UseGetAllPostsReturnType => {
  const { data, isLoading } = useQuery({
    queryKey: ['allPosts'],
    queryFn: () => getAllPosts({})
  });

  return {
    isLoading,
    posts: (data?.data ?? null) as Posts | null
  }
}