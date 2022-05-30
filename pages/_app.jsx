import React, { useRef } from "react";
import { SSRProvider } from "@react-aria/ssr";
import "../styles/globals.css";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </SSRProvider>
  );
}

export default MyApp;
