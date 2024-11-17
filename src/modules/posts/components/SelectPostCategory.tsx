import { Category } from '@modules/categories/types'
import React, { FC, useState } from 'react'

type Params = { categories: Category[], categoryId: number, setCategoryId: React.Dispatch<number> };

export const SelectPostCategory: FC<Params> = ({ categories, categoryId, setCategoryId }) => {
  const options = categories.filter(cat => cat.status === 'active').map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>);
  
  return (
    <select value={categoryId} onChange={e => setCategoryId(+e.target.value)}>
      {options}
    </select>
  )
}
