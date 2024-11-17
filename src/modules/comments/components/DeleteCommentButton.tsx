"use client";

import React, { FC, FormEventHandler, MouseEventHandler, useState } from 'react'
import { useCreateComment } from '../hooks/useCreateComment';
import { hasErrors } from '@modules/core/utils';
import { useRouter } from 'next/navigation';
import { useUpdateComment } from '../hooks';
import { Comment } from '../types';

type Props = {
  comment: Comment
}

export const DeleteCommentButton: FC<Props> = ({ comment }) => {  
  const { updateComment } = useUpdateComment();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();

      const response = await updateComment({ data: { body: comment.body, status: 'deleted' }, path: { id: comment.id }});

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
