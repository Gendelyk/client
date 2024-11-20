import { RegistrationForm } from "@/modules/auth/components/RegistrationForm";
import { Box } from "@mui/material";
import { FC } from "react";

export const RegisterScreen: FC = () => {
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
      <RegistrationForm />
    </Box>
  );
};
