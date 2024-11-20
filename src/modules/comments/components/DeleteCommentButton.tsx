"use client";

import React, { FC, FormEventHandler, MouseEventHandler, useState } from 'react'
import { useCreateComment } from '../hooks/useCreateComment';
import { hasErrors } from '@modules/core/utils';
import { useRouter } from 'next/navigation';
import { useUpdateComment } from '../hooks';
import { Comment } from '../types';
import { Button, IconButton } from '@mui/material';

type Props = {
  comment: Comment,
  onClick: (commentId: number) => void
}

export const DeleteCommentButton: FC<Props> = ({ comment, onClick }) => {  
  const { updateComment } = useUpdateComment();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();

      const response = await updateComment({ data: { body: comment.body, status: 'deleted' }, path: { id: comment.id }});

      if (response !== undefined && hasErrors(response)) {
        return;
      }      
      onClick(comment.id);
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
