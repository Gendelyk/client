'use client';

import React from 'react'
import { useGetAllCategories } from '../hooks'
import { CategoryListItem } from '../components/CategoryListItem';

export const Categories = () => {
  const { categories } = useGetAllCategories();
  let list: React.ReactNode[] = [];

  if (categories !== null) {
    list = categories.filter(cat => cat.status === 'active').map(cat => <CategoryListItem key={cat.id} category={cat}/>);
  }  

  return categories !== null ? (
    <>    
      <h1>Categories</h1>
      <ul>{list}</ul>
    </>
  ) : <div>Loading...</div>;
}
