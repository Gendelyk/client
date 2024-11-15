"use client";

import { useRouter } from "next/navigation";
import React, { FormEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreatePost } from "../hooks";

export const CreatePostForm = ({ categoryId }: { categoryId: number }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const { createPost } = useCreatePost();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await createPost({ data: { title, body, categoryId } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      
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
