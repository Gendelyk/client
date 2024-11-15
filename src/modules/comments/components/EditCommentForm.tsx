"use client";

import React, { FormEventHandler, useState } from 'react'
import { useCreateComment } from '../hooks';
import { hasErrors } from '@modules/core/utils';
import { useRouter } from 'next/navigation';
import { useUpdateComment } from '../hooks';

export const EditCommentForm = () => {
  const [comment, setComment] = useState('');
  const { createComment: updateComment } = useUpdateComment();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();

      const response = await updateComment({ data: { body: comment, status: 'active' } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Comment:</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>      
      <button type="submit">Enter</button>
    </form>
  )
}
