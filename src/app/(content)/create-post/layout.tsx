'use client';

import { useCurrentUser } from '@modules/user/hooks';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

const CreatePostLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();  
  const { user } = useCurrentUser();

  useEffect(() => {            
    if (user && !user.id) {
      router.replace('/login');
    }
  }, [router, user]);

  if (user === null || !user.id) {
    return;
  }

  return (
    <>      
      {children}
    </>
  )
}

export default CreatePostLayout;