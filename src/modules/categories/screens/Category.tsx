'use client'

import React, { FC, useEffect } from 'react'
import { useGetCategory } from '../hooks'
import { notFound, useRouter } from 'next/navigation'
import { DeleteCategoryButton } from '../components'
import { CategoryProps } from '../types'
import { queryClient } from '@modules/core/queryClient'
import { QueryFilters } from '@tanstack/react-query'



export const Category: FC<CategoryProps> = ({ params }) => {  
  const { category, isLoading } = useGetCategory(params.categoryId);    

  return category !== null ? (
    <>
      <div>{category.title}</div>
      <DeleteCategoryButton category={category}/>
    </>
  ) : <div>Loading...</div>;
}
