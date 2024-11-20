import { LoginForm } from "@/modules/auth/components/LoginForm";
import { Box } from "@mui/material";
import { FC } from "react";

export const LoginScreen: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <LoginForm />
    </Box>
  );
};
