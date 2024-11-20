"use client";

import React, { FC, use, useEffect, useMemo } from "react";
import { useCurrentUser } from "../hooks";
import { LogoutButton } from "@modules/auth/components";
import { useRouter } from "next/navigation";
import Link from "next/link";

// export const ProfileScreen: FC = () => {  
//   const { user } = useCurrentUser();

//   return user !== null ? (
//   <>
//     <div>Hello, {user.firstName} {user.lastName}</div>
//     <Link href={'/profile/change-name'}>Change name</Link>
//     <Link href={'/profile/change-password'}>Change password</Link>
//     <LogoutButton />
//   </> 
//   ) : <div>Loading...</div>;
// };

import { useState } from "react";
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { User } from "../types";
import { useGetAllPosts } from "@modules/posts/hooks";

type Post = {
  id: number,
  categoryId: number,
  title: string,  
};

export const ProfileScreen: React.FC = () => {       
  const initialPostsCount = 2;
  const incrementPostsCount = 2; 
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]); // Посты, которые отображаются
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(false); // Флаг наличия еще постов
  const [postsToShow, setPostsToShow] = useState<number>(initialPostsCount); // Количество постов для отображения за раз
  const { user } = useCurrentUser();
  const { posts } = useGetAllPosts();    

  useEffect(() => {
    setDisplayedPosts(userPosts.slice(0, postsToShow));
  }, [userPosts, postsToShow]);

  useEffect(() => {
    if (user === null || posts === null || !posts.length) {
      return;
    }    
    const userPostsCopy = posts
      .filter(post => post.author.id === user.id)
      .map((post): Post => ({
        id: post.id,
        categoryId: post.categoryId,
        title: post.title,        
    }));
    setUserPosts(userPostsCopy);
    setHasMorePosts(userPostsCopy.length > initialPostsCount);
  }, [user, posts]);

  if (user === null || posts === null) {
    return;
  }  

  const loadMorePosts = () => {
    const nextPostCount = postsToShow + incrementPostsCount;
    setPostsToShow(nextPostCount);
    if (userPosts.length <= nextPostCount) {
      setHasMorePosts(false);
    }
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Мій профіль
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6">Ім'я: {user.firstName} {user.lastName}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
        <Link href={'/profile/change-name'} passHref>
          <Button
            variant="contained"
            color="secondary"              
          >
            Змінити ім'я
          </Button>
        </Link>
        <Link href={'/profile/change-password'} passHref>
          <Button
            variant="contained"
            color="secondary"              
          >
            Змінити пароль
          </Button>
        </Link>
        <LogoutButton />
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Мої пости:
      </Typography>
      <List>
        {displayedPosts?.map((post) => (          
          <ListItem key={post.id}>
            <Link href={`/categories/${post.categoryId}/posts/${post.id}`} passHref>
              <ListItemText primary={post.title} />
            </Link>
          </ListItem>          
        ))}
      </List>

      {hasMorePosts && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={loadMorePosts}>
            Показати ще
          </Button>
        </Box>
      )}
    </Box>
  );
};

