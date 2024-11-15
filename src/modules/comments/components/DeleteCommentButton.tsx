"use client";

import React, { FormEventHandler, MouseEventHandler, useState } from 'react'
import { useCreateComment } from '../hooks/useCreateComment';
import { hasErrors } from '@modules/core/utils';
import { useRouter } from 'next/navigation';
import { useUpdateComment } from '../hooks';

export const DeleteCommentButton = ({ comment }: { comment: string }) => {  
  const { createComment: updateComment } = useUpdateComment();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();

      const response = await updateComment({ data: { body: comment, status: 'deleted' } });

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
