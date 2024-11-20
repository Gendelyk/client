import { GetPostReturnType } from '@modules/posts/api'
import { Post } from '@modules/posts/types'
import React, { FC } from 'react'
import { Comment } from '../types'
import { CommentItem } from './CommentItem'
import { Typography, List, ListItem, ListItemText } from '@mui/material'


type Props = {
  comments: Comment[],
  handleDelete: (commentId: number) => void
}

export const CommentsList: FC<Props> = ({ comments, handleDelete }) => {
  const list = comments
    .filter(comm => comm.status === 'active')
    .map(comm => <CommentItem comment={comm} key={comm.id} handleDelete={handleDelete}/>);
  return (
    <>
      {/* <div>Comments:</div>
      <ul>{list}</ul> */}      
      <List>{list}</List>
    </>
  )
}
