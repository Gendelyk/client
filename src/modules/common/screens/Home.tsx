"use client";

import { LogoutButton } from "@modules/auth/components";
import { useCurrentUser } from "@modules/user/hooks";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { RecommendedPosts } from "@modules/posts/components/RecommendedPosts";

export const HomeScreen: FC = () => {    
  const { user } = useCurrentUser();
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 8,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Вітаємо на веб-форумі Gendelyk!
      </Typography>
      <Link href="/categories" passHref>
        <Button variant="contained" color="primary" sx={{ mt: 4 }}>
          Перейти до категорій
        </Button>
      </Link>
      {user !== null && user.id && <RecommendedPosts userId={user.id}/>}
    </Box>
  )
};
