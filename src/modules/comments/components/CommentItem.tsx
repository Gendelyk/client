import React, { FC } from 'react'
import { Comment } from '../types'
import { DeleteCommentButton } from './DeleteCommentButton'
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material'
import { useCurrentUser } from '@modules/user/hooks'

type Props = {
  comment: Comment,
  handleDelete: (commentId: number) => void
}

export const CommentItem: FC<Props> = ({ comment, handleDelete }) => {
  const { user } = useCurrentUser();

  return (
    <ListItem key={comment.id} divider>
      <ListItemText
        secondary={`${comment.author.firstName} ${comment.author.lastName}`}
        primary={comment.body}
      />
      <ListItemSecondaryAction>        
        {user !== null && user.role === 'admin' && (
        <DeleteCommentButton comment={comment} onClick={handleDelete}/>
        )}          
      </ListItemSecondaryAction>
    </ListItem>
  )
}
