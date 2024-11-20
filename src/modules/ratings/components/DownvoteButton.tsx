"use client";

import { useRouter } from "next/navigation";
import React, { FC, FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreateRating } from "../hooks";
import { Button } from "@mui/material";

type Props = {
  postId: number,
  downvoteCount: number,
  clickFunction: () => void
}

export const DownvoteButton: FC<Props> = ({ postId, downvoteCount, clickFunction }) => {
  const { createRating } = useCreateRating();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await createRating({ data: { postId, rating: 'downvote' } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      
      clickFunction();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleClick}>
      Не сподобалося ({downvoteCount})
    </Button>
  );
};
