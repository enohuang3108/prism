"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import AddAssetDialog from "./add-asset-dialog";
import AssetTable from "./asset-table";
import { Asset } from "./columns";

export default function ProfileForm() {
  const [assets, setAssets] = useState<Asset[]>([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("asset") ?? "[]");
    setAssets(data);
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            // staleTime: 60 * 1000,
          },
        },
      })
  );

  const A = () => {
    if (assets) {
      console.log("A", assets);

      return <AssetTable assets={assets} />;
    }
    return null;
  };
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center p-4">
        <AddAssetDialog />
        <Suspense fallback={<div>Loading...</div>}>
          <A />
        </Suspense>
      </main>
    </QueryClientProvider>
  );
}
