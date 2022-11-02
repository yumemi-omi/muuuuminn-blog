import {
  Hydrate,
  QueryClientProvider as _QueryClientProvider,
  DehydratedState,
  QueryClient,
} from "@tanstack/react-query";
import { FC } from "react";
import { ReactNode, useState } from "react";

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
