'use client';

import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Posts } from '../types/posts';

interface Props {
  posts: Posts;
  onClick: (filteredPosts: Posts) => void;
}

export const SearchPosts: React.FC<Props> = ({ posts, onClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onClick(filteredPosts);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 4,
        maxWidth: 800,
        margin: '0 auto',
      }}
    >    
      <TextField
        label="Пошук за назвою"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ flex: 1 }}
      />

      {/* Кнопка поиска */}
      <Button variant="contained" onClick={handleSearch}>
        Пошук
      </Button>
    </Box>
  );
};
