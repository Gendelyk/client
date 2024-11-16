"use client";

import { useRouter } from "next/navigation";
import React, { FC, FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreateCategory, useUpdateCategory } from "../hooks";
import { Category } from "../types";

export const DeleteCategoryButton: FC<{ category: Category }> = ({ category }) => {  
  const router = useRouter();

  const { updateCategory } = useUpdateCategory();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await updateCategory({ data: { title: category.title, status: 'archived' }, path: { id: category.id } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      
      router.replace('/categories');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleClick}>Delete</button>
  );
};
