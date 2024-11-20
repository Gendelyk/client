'use client';

import React, { FC, useState } from 'react'
import { useGetPost } from '../hooks'
import { DownvoteButton, RatingBar, UpvoteButton } from '@modules/ratings/components'
import { CommentsList } from '@modules/comments/components/CommentsList';
import { Category } from '@modules/categories/types';
import { Comment } from '@modules/comments/types';
import { CommentSection } from '@modules/comments/components/CommentSection';
import { Box, CircularProgress, Typography, Divider } from '@mui/material';
import { Loader } from '@modules/common/components';

type Props = {
  params: {
    postId: number
  }
}

export const Post: FC<Props> = ({ params }) => {
  const { post } = useGetPost(params.postId);  

  // return post !== null ? (
  //   <>
  //     <h1>{post.title}</h1>
  //     <div>Author: {post.author.firstName} {post.author.lastName}</div>
  //     <div>{post.body}</div>
  //     <RatingBar post={post}/>
  //     <CommentsList comments={post.comments}/>  
  //   </>
  // ) : <div>Loading...</div>;

  return post === null ? <Loader /> : (
    <Box sx={{ padding: 4 }}>                              
          <Typography variant="h4" component="h1" gutterBottom>
            {post.title}
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom>
            Автор: {`${post.author.firstName} ${post.author.lastName}`}
          </Typography>
          
          <Typography variant="body1" gutterBottom>
            {post.body}
          </Typography>

          <Divider sx={{ marginY: 2 }} />
          
          <RatingBar post={post}/>

          <Divider sx={{ marginY: 4 }} />
          
          <CommentSection postId={post.id}/>        
    </Box>
  );
}
