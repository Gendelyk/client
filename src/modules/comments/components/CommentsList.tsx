import { GetPostReturnType } from '@modules/posts/api'
import { Post } from '@modules/posts/types'
import React, { FC } from 'react'
import { Comment } from '../types'
import { CommentItem } from './CommentItem'


type Props = {
  comments: Comment[]
}

export const CommentsList: FC<Props> = ({ comments }) => {
  const list = comments
    .filter(comm => comm.status === 'active')
    .map(comm => <CommentItem comment={comm} key={comm.id} />);
  return (
    <>
      <div>Comments:</div>
      <ul>{list}</ul>
    </>
  )
}