"use client";

import { Navbar } from '@modules/common/components/Navbar';
import './globals.css';
import { queryClient } from "@modules/core/queryClient";
import { initAxios } from "@modules/core/utils";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import { Box } from '@mui/material';
import Header from '@modules/common/components/Header';
import Footer from '@modules/common/components/Footer';

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

initAxios();

console.log("root layout");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   queryClient.removeQueries({queryKey: ['currentPost']});
  //   console.log('dd')
  // }, []);
  return (
    <html lang="en">
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: localStoragePersister }}>          
        <body>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </body>                
      </PersistQueryClientProvider>
    </html>
  );
}
