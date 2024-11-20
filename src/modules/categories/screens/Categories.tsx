'use client';

import React, { useEffect, useState } from 'react';
import { useGetAllCategories } from '../hooks';
import { Box, Typography, CircularProgress, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { Category } from '../types';
import { CategoryListItem } from '../components/CategoryListItem';
import { Loader } from '@modules/common/components';

// Основной компонент страницы
export const Categories = () => {
  const { categories } = useGetAllCategories();
  const [ activeCategories, setActiveCategories ] = useState<Category[]>([]);

  useEffect(() => {
    if (categories === null || !categories.length) {
      return;
    }
    setActiveCategories(categories.filter(cat => cat.status === 'active'));
  }, [categories]);

  function handleDelete(categoryId: number) {    
    setActiveCategories(activeCategories.filter(cat => cat.id != categoryId));
  }

  return categories !== null ? (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Категорії
      </Typography>
      {activeCategories        
        .map((category) => (
          <CategoryListItem key={category.id} category={category} handleDelete={handleDelete} />
        ))}
    </Box>
  ) : (
    <Loader />
  );
};
