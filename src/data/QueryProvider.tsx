import {
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";
import { JsxAttributeLike } from "typescript";
  
  export default function QueryProvider({ children }: any) {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          cacheTime: Infinity,
        },
      },
    });
  
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }
  