import React, { useEffect } from 'react'
import { CreatePostForm } from '../components'
import { Box, Typography } from '@mui/material'
import { useCurrentUser } from '@modules/user/hooks';
import { useRouter } from 'next/navigation';

export const CreatePost = () => {  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Створити пост
      </Typography>
      <CreatePostForm />
    </Box>
  )
}
