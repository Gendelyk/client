import React, { FC } from 'react'
import { Comment } from '../types'
import { DeleteCommentButton } from './DeleteCommentButton'
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material'

type Props = {
  comment: Comment,
  handleDelete: (commentId: number) => void
}

export const CommentItem: FC<Props> = ({ comment, handleDelete }) => {
  return (
    <ListItem key={comment.id} divider>
      <ListItemText
        secondary={`${comment.author.firstName} ${comment.author.lastName}`}
        primary={comment.body}
      />
      <ListItemSecondaryAction>        
        <DeleteCommentButton comment={comment} onClick={handleDelete}/>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
