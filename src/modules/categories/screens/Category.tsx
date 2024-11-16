'use client'

import React, { FC } from 'react'
import { useGetCategory } from '../hooks'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    categoryId: number
  }  
}

export const Category: FC<Props> = ({ params }) => {
  const { category, isLoading } = useGetCategory(params.categoryId);  

  return category ? (
    <div>{category.title}</div>
  ) : <div>Loading...</div>;
}
