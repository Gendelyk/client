'use client';

import React, { FC, useEffect, useState } from 'react'
import { UpvoteButton } from './UpvoteButton';
import { DownvoteButton } from './DownvoteButton';
import { Post } from '@modules/posts/types';
import { useGetRating } from '../hooks';
import { Box, Button } from '@mui/material';

type Props = {
  post: Post
};

type Rating = 'upvote' | 'downvote' | 'no rating';

export const RatingBar: FC<Props> = ({ post }) => {
  const [upvoteCount, setUpvoteCount] = useState(post.upvoteCount);
  const [downvoteCount, setDownvoteCount] = useState(post.downvoteCount);
  const [rating, setRating] = useState<Rating>('no rating');
  const { myRating } = useGetRating(post.id);  

  useEffect(() => {
    if (myRating?.rating === 'upvote') {
      setRating('upvote');
    } else if (myRating?.rating === 'downvote') {
      setRating('downvote');
    }
  }, [myRating?.rating]);

  function clickUpvote() {
    console.log(rating);
    if (rating === 'no rating') {
      setUpvoteCount(upvoteCount + 1);
      setRating('upvote');
    } else if (rating === 'upvote') {
      setUpvoteCount(upvoteCount - 1);
      setRating('no rating');
    } else {
      setUpvoteCount(upvoteCount + 1);
      setDownvoteCount(downvoteCount - 1);
      setRating('upvote');
    }
  }

  function clickDownvote() {    
    if (rating === 'no rating') {
      setDownvoteCount(downvoteCount + 1);
      setRating('downvote');
    } else if (rating === 'upvote') {
      setUpvoteCount(upvoteCount - 1);
      setDownvoteCount(downvoteCount + 1);
      setRating('downvote');
    } else {
      setDownvoteCount(downvoteCount - 1);
      setRating('no rating');
    }
  }

  // return myRating !== null && (
  //   <>
  //     <div>+ {upvoteCount} | - {downvoteCount}</div>
  //     <div><UpvoteButton postId={post.id } clickFunction={clickUpvote}/> | <DownvoteButton postId={post.id} clickFunction={clickDownvote}/></div>
  //   </>
  // )

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <UpvoteButton postId={post.id} upvoteCount={upvoteCount} clickFunction={clickUpvote}/>
      <DownvoteButton postId={post.id} downvoteCount={downvoteCount} clickFunction={clickDownvote}/>
    </Box>
  );
}
