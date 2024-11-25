import React, { FC } from 'react'
import { Category } from '../types'
import Link from 'next/link'
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material'
import { DeleteCategoryButton } from './DeleteCategoryButton'
import { useCurrentUser } from '@modules/user/hooks'

type Props = {
  category: Category
  handleDelete: (categoryId: number) => void
}

export const CategoryListItem: FC<Props> = ({ category, handleDelete }) => {
  const { user } = useCurrentUser();
  return (
    <Card variant="outlined" sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ flex: 1 }}>
        <Link href={`categories/${category.id}`} passHref>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {category.title}
            </Typography>                
          </CardContent>
        </Link>
      </Box>
      {(user !== null && user.role === 'admin') && (
        <DeleteCategoryButton category={category} onClick={handleDelete}/>
      )}
    </Card> 
  );
};

