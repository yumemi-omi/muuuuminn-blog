const fetcher = <TData, TVariables>(query: string, variables?: TVariables) => {
  return async (): Promise<TData> => {
    const res = await fetch(`${process.env.APP_GITHUB_API_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    return json.data;
  };
};

export default fetcher;
