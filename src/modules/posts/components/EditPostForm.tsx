"use client";

import { useRouter } from "next/navigation";
import React, { FC, FormEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreatePost, useUpdatePost } from "../hooks";
import { Post } from "../types";

type Props = {
  post: Post
}

export const EditPostForm: FC<Props> = ({ post }) => {
  const [title, setTitle] = useState(post.title);  
  const [body, setBody] = useState(post.body);
  const router = useRouter();

  const { updatePost } = useUpdatePost();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await updatePost({ data: { title, body, status: 'active' }, path: { id: post.id } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      

      router.replace(`/categories/${post.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Body:</label>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <button type="submit">Enter</button>
    </form>
  );
};
