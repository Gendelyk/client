import React, { FC } from 'react'
import { Category } from '../types'
import Link from 'next/link'

export const CategoryListItem: FC<{ category: Category }> = ({ category }) => {
  return (
    <li>
      <h2>
        <Link href={`categories/${category.id}`}>{category.title}</Link>
      </h2>
    </li>
  )
}
