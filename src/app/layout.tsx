"use client";

import { queryClient } from "@modules/core/queryClient";
import { initAxios } from "@modules/core/utils";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";

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
        <body>{children}</body>
      </PersistQueryClientProvider>
    </html>
  );
}
