"use client";

import { useRouter } from "next/navigation";
import React, { FC, FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreateCategory, useUpdateCategory } from "../hooks";
import { Category } from "../types";
import { Button } from "@mui/material";

type Props = {
  category: Category,
  onClick: (categoryId: number) => void
}

export const DeleteCategoryButton: FC<Props> = ({ category, onClick }) => {  
  const router = useRouter();

  const { updateCategory } = useUpdateCategory();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await updateCategory({ data: { title: category.title, status: 'archived' }, path: { id: category.id } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      
      onClick(category.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="outlined" color="error" sx={{ marginRight: 2 }} onClick={handleClick}>
      Видалити
    </Button>
  );
};
