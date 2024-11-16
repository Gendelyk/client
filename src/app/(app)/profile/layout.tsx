'use client';

import { useCurrentUser } from '@modules/user/hooks';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

const ProfileLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isPageFound, setIsPageFound] = useState(false);
  const { user } = useCurrentUser();

  useEffect(() => {            
    if (user && !user.id) {
      router.replace('/login');
    } else if (user) {      
      setIsPageFound(true);
    }
  }, [router, user]);


  return isPageFound && (
    <>      
      {children}
    </>
  )
}

export default ProfileLayout;