'use client';

import { useGetCategory } from '@modules/categories/hooks';
import { CategoryProps } from '@modules/categories/types';
import { notFound, useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

const CategoryLayout: FC<{ children: React.ReactNode } & CategoryProps> = ({ children, params }) => {
  const { category, isLoading } = useGetCategory(params.categoryId);    
  const [ isPageFound, setIsPageFound ] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (category?.status === 'archived' || (category && !category.id)) {            
      notFound();
    } else if (category) {
      setIsPageFound(true);
    }
  }, [router, category]);


  return (
    isPageFound &&
    <>
      {children}
    </>
  )
}

export default CategoryLayout;