import { useCurrentUser } from "@modules/user/hooks";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useState, useEffect, FC } from "react";

const Header: FC = () => {
  // const [isUser, setIsUser] = useState(false);
  const { user } = useCurrentUser();

  if (user === null) {    
    return;
  }
  const isAuth = user.id;
  const isAdmin = user.role === 'admin';


  // useEffect(() => { 
  //   if (user !== null && user.role === 'user') {
  //     setIsUser(true);
  //   }
  // }, [user]);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/home" passHref>
            Gendelyk Forum
          </Link>
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {!isAuth ? (
            <>
              <Link href="/categories" passHref>
                <Button color="inherit">Категорії</Button>
              </Link>
              <Link href="/login" passHref>
                <Button color="inherit">Вхід</Button>
              </Link>
              <Link href="/registration" passHref>
                <Button color="inherit">Реєстрація</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/categories" passHref>
                <Button color="inherit">Категорії</Button>
              </Link>
              <Link href="/profile" passHref>
                <Button color="inherit">Профіль</Button>
              </Link>
              <Link href="/create-post" passHref>
                <Button color="inherit">Створити пост</Button>
              </Link>
              {isAdmin && (
              <Link href="/create-category" passHref>
                <Button color="inherit">Створити категорію</Button>
              </Link>
              )}              
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
