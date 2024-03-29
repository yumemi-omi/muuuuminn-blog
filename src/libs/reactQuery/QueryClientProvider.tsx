
import type { FC } from "react";
import type { ReactNode} from "react";
import { useState } from "react";

import {
  Hydrate,
  QueryClientProvider as _QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import type {
  DehydratedState} from "@tanstack/react-query";

type Props = {
  dehydratedState: DehydratedState;
  children: ReactNode;
};

const QueryClientProvider: FC<Props> = ({ dehydratedState, children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // https://tanstack.com/query/v4/docs/guides/window-focus-refetching
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            networkMode: "offlineFirst",
            suspense: false,
          },
        },
      }),
  );

  return (
    <_QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </_QueryClientProvider>
  );
};

export default QueryClientProvider;
