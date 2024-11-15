"use client";

import { useRouter } from "next/navigation";
import React, { FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { hasErrors } from "@modules/core/utils";
import { useCreateCategory, useUpdateCategory } from "../hooks";

export const DeleteCategoryButton = ({ title }: { title: string }) => {  
  const router = useRouter();

  const { updateCategory } = useUpdateCategory();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      event.preventDefault();
      
      const response = await updateCategory({ data: { title, status: 'archived' }, path: { id: 0 } });

      if (response !== undefined && hasErrors(response)) {
        return;
      }      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleClick}>Delete</button>
  );
};
