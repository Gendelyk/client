'use client'

import React, { FC, useEffect } from 'react'
import { useGetCategory } from '../hooks'
import { notFound, useRouter } from 'next/navigation'
import { DeleteCategoryButton } from '../components'
import { CategoryProps } from '../types'
import { queryClient } from '@modules/core/queryClient'
import { QueryFilters } from '@tanstack/react-query'
import { PostList } from '@modules/posts/components/PostList'
import { Box, CircularProgress, Typography } from '@mui/material'
import { Loader } from '@modules/common/components'



export const Category: FC<CategoryProps> = ({ params }) => {  
  const { category, isLoading } = useGetCategory(params.categoryId);    

  // return category !== null ? (
  //   <>
  //     <div>{category.title}</div>
  //     <DeleteCategoryButton category={category}/>
  //     <PostList categoryId={category.id}/>
  //   </>
  // ) : <div>Loading...</div>;
  return (
    <Box sx={{ padding: 4 }}>
      {category === null ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            Пости в категорії {category?.title}
          </Typography>
          <PostList categoryId={params.categoryId}/>
        </>
      )}
    </Box>
  );
}
