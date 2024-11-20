"use client";

import React, { FC, FormEventHandler, MouseEventHandler, useState } from 'react'
import { useCreatePost } from '../hooks/useCreatePost';
import { hasErrors } from '@modules/core/utils';
import { useRouter } from 'next/navigation';
import { useUpdatePost } from '../hooks';
import { Button } from '@mui/material';

type Post = {
  id: number,
  author: {
    firstName: string,
    lastName: string
  },
  title: string,
  body: string
}

type Props = {
  post: Post,
  onClick: (postId: number) => void
}

export const DeletePostButton: FC<Props> = ({ post, onClick }) => {  
  const { updatePost } = useUpdatePost();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();

      const response = await updatePost({ data: { title: post.title, body: post.body, status: 'deleted' }, path: { id: post.id }});

      if (response) return;

      onClick(post.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="outlined" color="error" onClick={handleClick}>
      Видалити
    </Button>
  )
}
