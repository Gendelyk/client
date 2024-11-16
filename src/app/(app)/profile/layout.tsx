'use client';

import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react'

const ProfileLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('accessToken='));    

  useEffect(() => {            
    if (!tokenCookie || tokenCookie.split('=')[1] === '') {
      router.replace('/login');
    }
  }, [router, tokenCookie]);


  return (
    <>
      {children}
    </>
  )
}

export default ProfileLayout;