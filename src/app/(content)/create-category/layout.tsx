'use client';

import { useCurrentUser } from '@modules/user/hooks';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

const CreateCategoryLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();  
  const { user } = useCurrentUser();

  useEffect(() => {            
    if (user && user.role !== 'admin') {
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

export default CreateCategoryLayout;