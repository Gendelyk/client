import React from 'react'
import { CreateCategoryForm } from '../components'
import { Box, Typography } from '@mui/material'

export const CreateCategory = () => {
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
        Створити категорію
      </Typography>
      <CreateCategoryForm />
    </Box>
  )
}
