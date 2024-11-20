import { Category } from '@modules/categories/types'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { FC, useState } from 'react'

type Params = { categories: Category[], categoryId: number, setCategoryId: React.Dispatch<number> };

export const SelectPostCategory: FC<Params> = ({ categories, categoryId, setCategoryId }) => {
  const options = categories
    .filter(cat => cat.status === 'active')
    .map(cat => (
      <MenuItem key={cat.id} value={cat.id}>
        {cat.title}
      </MenuItem>
  ));
  
  return (
    <FormControl fullWidth>
      <InputLabel id="category-label">Категорія</InputLabel>
      <Select
        labelId="category-label"
        value={categoryId}
        onChange={(e) => setCategoryId(+e.target.value)}
        required
      >
        {options}    
      </Select>
    </FormControl>
  );
}
