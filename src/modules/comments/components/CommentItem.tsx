import React, { FC } from 'react'
import { Comment } from '../types'

type Props = {
  comment: Comment
}

export const CommentItem: FC<Props> = ({ comment }) => {
  return (
    <li>      
      <div>{comment.author.firstName} {comment.author.lastName}</div>
      <div>{comment.body}</div>
    </li>  
  )
}
