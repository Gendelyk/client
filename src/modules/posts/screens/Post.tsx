'use client';

import React, { FC, useState } from 'react'
import { useGetPost } from '../hooks'
import { DownvoteButton, RatingBar, UpvoteButton } from '@modules/ratings/components'
import { CommentsList } from '@modules/comments/components/CommentsList';
import { Category } from '@modules/categories/types';
import { Comment } from '@modules/comments/types';

type Props = {
  params: {
    postId: number
  }
}

export const Post: FC<Props> = ({ params }) => {
  const { post } = useGetPost(params.postId);  

  return post !== null ? (
    <>
      <h1>{post.title}</h1>
      <div>Author: {post.author.firstName} {post.author.lastName}</div>
      <div>{post.body}</div>
      <RatingBar post={post}/>
      <CommentsList comments={post.comments}/>  
    </>
  ) : <div>Loading...</div>
}
