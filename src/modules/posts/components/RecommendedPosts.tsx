import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { paths } from '@modules/core/types/recommend-system-types';

interface Post {
  id: number;
  category_id: number;
  title: string;  
}

interface Props {
  userId: number;
}

export const RecommendedPosts: React.FC<Props> = ({ userId }) => {
  const [recommendedPosts, setRecommendedPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8000/recommend', {
          user_id: userId,
          title: '',
          quantity: 5,
        });

        setRecommendedPosts(response.data);
      } catch (error) {
        setRecommendedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        mt: 5,
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 4,
      }}
    >
      {/* Заголовок */}
      <Typography variant="h5" gutterBottom>
        Рекомендовані пости
      </Typography>

      {/* Лоадер */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : recommendedPosts && recommendedPosts.length > 0 ? (
        <Box sx={{ marginTop: 2 }}>
          {recommendedPosts.map((post) => (
            <Card key={post.id} variant="outlined" sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">
                  <Link href={`/categories/${post.category_id}/posts/${post.id}`}>{post.title}</Link>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 4 }}>
          Нет рекомендаций.
        </Typography>
      )}
    </Box>
  );
};
