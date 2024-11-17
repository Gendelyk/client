"use client";

import React, { FC, FormEventHandler, MouseEventHandler, useState } from 'react'
import { useCreatePost } from '../hooks/useCreatePost';
import { hasErrors } from '@modules/core/utils';
import { useRouter } from 'next/navigation';
import { useUpdatePost } from '../hooks';
import { Post } from '../types';

type Props = {
  post: Post
}

export const DeletePostButton: FC<Props> = ({ post }) => {  
  const { updatePost } = useUpdatePost();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();

      const response = await updatePost({ data: { title: post.title, body: post.body, status: 'deleted' }, path: { id: post.id }});

      if (response !== undefined && hasErrors(response)) {
        return;
      }      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleClick}>Delete</button>
  )
}
