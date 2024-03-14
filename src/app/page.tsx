"use client";
import { useCounterStore } from "@/providers/counter-store-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Page() {
  const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state
  );
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

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col items-center justify-center space-y-1">
        <div>
          Count: {count}
          <hr />
          <button type="button" onClick={() => void incrementCount()}>
            Increment Count
          </button>
          <button type="button" onClick={() => void decrementCount()}>
            Decrement Count
          </button>
        </div>
      </main>
    </QueryClientProvider>
  );
}
