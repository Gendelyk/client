'use client';

import { useGetAllCategories } from '@modules/categories/hooks'
import React, { FC } from 'react'
import { useGetAllPosts } from '../hooks'

type Props = {
  categoryId: number
}

export const PostList: FC<Props> = ({ categoryId }) => {
  const { posts } = useGetAllPosts();
  let list: React.ReactNode[] = [];

  if (posts !== null) {
    list = posts
      .filter(post => post.categoryId === categoryId && post.status === 'active')
      .map(post => <li key={post.id}>{post.title}</li>);
  }

  return posts !== null && (
    <ul>{list}</ul>
  )
}
