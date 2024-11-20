'use client';

import { useGetCategory } from '@modules/categories/hooks';
import { CategoryProps } from '@modules/categories/types';
import { useGetPost } from '@modules/posts/hooks';
import { notFound, useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
type Props = {
  children: React.ReactNode,
  params: {
    postId: number
  }
}

const PostLayout: FC<Props> = ({ children, params }) => {
  const { post, isLoading } = useGetPost(params.postId);    
  const [ isPageFound, setIsPageFound ] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (post?.status === 'archived' || (post && !post.id)) {            
      notFound();
    } else if (post) {
      setIsPageFound(true);
    }
  }, [router, post]);


  return (
    isPageFound &&
    <>
      {children}
    </>
  )
}

export default PostLayout;