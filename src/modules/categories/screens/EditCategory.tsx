'use client';

import React, { FC } from 'react'
import { EditCategoryForm } from '../components'
import { CategoryProps } from '../types'
import { useGetCategory } from '../hooks';

export const EditCategory: FC<CategoryProps> = ({ params }) => {
  const { category, isLoading } = useGetCategory(params.categoryId);

  return category !== null ? (
    <EditCategoryForm category={category}/>
  ) : <div>Loading...</div>
}
