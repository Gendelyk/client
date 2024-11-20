'use client';

import React, { FC, useEffect, useState } from 'react'
import { CreateCommentForm } from './CreateCommentForm'
import { CommentsList } from './CommentsList'
import { Comment } from '../types';
import { useGetPost } from '@modules/posts/hooks';
import { Typography } from '@mui/material';

type Props = {
  postId: number
}

export const CommentSection: FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { post } = useGetPost(postId);  

  function handleCreate(comment: Comment) {
    setComments([comment, ...comments]);
  }

  function handleDelete(commentId: number) {
    setComments([...comments.filter(comm => comm.id != commentId)]);
  }

  useEffect(() => {
    if (post !== null) {
      setComments(post.comments);
    }
  }, [post]);
  return post !== null && (
    // <>
    //   <CreateCommentForm postId={postId} onClick={handleCreate} />
    //   <CommentsList comments={comments}/>
    // </>
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Коментарі
      </Typography>
      <CreateCommentForm postId={postId} onClick={handleCreate}/>
      <CommentsList comments={comments} handleDelete={handleDelete}/>
    </>
  )
}
