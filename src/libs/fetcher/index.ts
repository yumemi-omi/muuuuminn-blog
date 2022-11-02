const url = `${process.env.NEXT_PUBLIC_APP_ROOT_URL || ""}${
  process.env.NEXT_PUBLIC_APP_GITHUB_API_ENDPOINT || ""
}`;

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"],
) => {
  return async (): Promise<TData> => {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        ...options,
      },
    });

    const json = await res.json();
    console.log({ json });
    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
};

export default fetcher;
