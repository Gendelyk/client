'use client';

import { useGetAllCategories } from '@modules/categories/hooks'
import React, { FC, useEffect, useState } from 'react'
import { useGetAllPosts } from '../hooks'
import Link from 'next/link';
import { List, ListItem, ListItemText, Box, Button, ListItemSecondaryAction } from '@mui/material';
import { DeletePostButton } from './DeletePostButton';
import { Posts } from '../types';
import { SearchPosts } from './SearchPosts';

type Props = {
  categoryId: number
}

type Post = {
  id: number,
  author: {
    firstName: string,
    lastName: string
  },
  title: string,
  body: string
}

export const PostList: FC<Props> = ({ categoryId }) => {
  const INITIAL_POST_COUNT = 5;
  const POSTS_INCREMENT = 5;  
  const { posts } = useGetAllPosts();
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [postCount, setPostCount] = useState(INITIAL_POST_COUNT);

  useEffect(() => {
    if (posts !== null && posts.length) {
      initPosts(posts);
    }
  }, [posts]);

  const initPosts = (posts: Posts) => {
    const categoryPostsCopy = posts
      .filter(post => post.categoryId === +categoryId && post.status === 'active')
      .map((post): Post => ({ id: post.id, title: post.title, body: post.body, author: { firstName: post.author.firstName, lastName: post.author.lastName } }));
    setCategoryPosts(categoryPostsCopy);
    setPostCount(INITIAL_POST_COUNT);
    if (categoryPostsCopy.length > INITIAL_POST_COUNT) {
      setDisplayedPosts(posts.slice(0, INITIAL_POST_COUNT));
    } else {
      setDisplayedPosts([...categoryPostsCopy]);
    }
  }

  const handleDelete = (postId: number) => {
    setDisplayedPosts(displayedPosts.filter(post => post.id != postId));
  }

  const loadMorePosts = () => {
    const nextPosts = categoryPosts.slice(
      postCount,
      postCount + POSTS_INCREMENT
    );
    setPostCount(postCount + POSTS_INCREMENT);
    setDisplayedPosts([...displayedPosts, ...nextPosts]);
  };

  return posts !== null && (
    <>
      <SearchPosts posts={posts} onClick={initPosts} />
      <List>
        {displayedPosts.map((post) => (
          <ListItem key={post.id} divider>
            <Link href={`/categories/${categoryId}/posts/${post.id}`} passHref>
              <ListItemText
                primary={post.title}
                secondary={`${post.author.firstName} ${post.author.lastName}`}
              />
            </Link>
            <ListItemSecondaryAction>        
              <DeletePostButton post={post} onClick={handleDelete}/>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {displayedPosts.length < categoryPosts.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" onClick={loadMorePosts}>
            Показати ще
          </Button>
        </Box>
      )}
    </>
  )
}
