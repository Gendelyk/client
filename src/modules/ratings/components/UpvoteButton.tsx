"use client";

import { useRouter } from "next/navigation";
import React, { FC, FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreateRating } from "../hooks";

type Props = {
  postId: number,
  clickFunction: () => void
}

export const UpvoteButton: FC<Props> = ({ postId, clickFunction }) => {
  const { createRating } = useCreateRating();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await createRating({ data: { postId, rating: 'upvote' } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      
      clickFunction();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleClick}>Upvote</button>
  );
};
