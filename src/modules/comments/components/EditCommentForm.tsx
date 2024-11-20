"use client";

import React, { FC, FormEventHandler, useState } from 'react'
import { useCreateComment } from '../hooks';
import { hasErrors } from '@modules/core/utils';
import { useRouter } from 'next/navigation';
import { useUpdateComment } from '../hooks';
import { Comment } from '../types';

type Props = {
  comment: Comment
}

export const EditCommentForm:FC<Props> = ({ comment }) => {
  const [body, setBody] = useState(comment.body);
  const { updateComment } = useUpdateComment();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();

      const response = await updateComment({ data: { body, status: 'active' }, path: { id: comment.id } });

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
        <label>Коментар:</label>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>      
      <button type="submit">Змінити</button>
    </form>
  )
}
