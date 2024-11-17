'use client'

import { getAllPosts, GetAllPostsParams, GetAllPostsReturnType, getPost, GetPostParams, GetPostReturnType } from "../api"
import { useQuery } from "@tanstack/react-query";
import { Post } from "../types";

type UseGetPostReturnType = {
  isLoading: boolean,
  post: Post | null
}

export const useGetPost = (id: number): UseGetPostReturnType => {
  const params: GetPostParams = {
    path: {
      id
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: [`currentPost${id}`],
    queryFn: () => getPost(params),    
    staleTime: 0
  });

  return {
    isLoading,
    post: (data?.data ?? null) as Post | null
  }
}