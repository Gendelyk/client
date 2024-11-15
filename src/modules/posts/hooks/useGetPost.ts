'use client'

import { getAllPosts, GetAllPostsParams, GetAllPostsReturnType, getPost, GetPostParams, GetPostReturnType } from "../api"
import { useQuery } from "@tanstack/react-query";

type Post = Extract<GetPostReturnType['data'], { id: number }>;

type UseGetPostReturnType = {
  isLoading: boolean,
  posts: Post | null
}

export const useGetPost = (id: number): UseGetPostReturnType => {
  const params: GetPostParams = {
    path: {
      id
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ['currentPost'],
    queryFn: () => getPost(params)
  });

  return {
    isLoading,
    posts: (data?.data ?? null) as Post | null
  }
}