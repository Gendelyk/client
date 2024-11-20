"use client";

import React, { FC, FormEventHandler, MouseEventHandler, useState } from 'react'
import { useCreateComment } from '../hooks';
import { hasErrors } from '@modules/core/utils';
import { useRouter } from 'next/navigation';
import { Comment } from '../types';
import { Box, TextField, Button } from '@mui/material';
import { useCurrentUser } from '@modules/user/hooks';

type Props = {
  postId: number,
  onClick: (comment: Comment) => void
}

export const CreateCommentForm: FC<Props> = ({ postId, onClick }) => {
  const [body, setBody] = useState('');
  const { user } = useCurrentUser();
  const { createComment } = useCreateComment();

  if (user === null) {
    return;
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();

      const response = await createComment({ data: { body, postId } });

      if (response.isError) {
        return;
      }            
      const comment: Comment = {
        id: response.data.id,
        body: response.data.body,
        status: response.data.status,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        author: user
      };
      onClick(comment);
    } catch (error) {
      console.error(error);
    }    
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Comment:</label>
    //     <textarea          
    //       value={body}
    //       onChange={(e) => setBody(e.target.value)}
    //       required
    //     />
    //   </div>      
    //   <button type="submit">Enter</button>
    // </form>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
      <TextField
        label="Створити коментар"
        variant="outlined"
        fullWidth
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Створити
      </Button>
    </Box>
  )
}
