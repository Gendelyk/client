'use client'

import { getAllPosts, GetAllPostsParams, GetAllPostsReturnType } from "../api"
import { useQuery } from "@tanstack/react-query";
import { Posts } from "../types/posts";

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