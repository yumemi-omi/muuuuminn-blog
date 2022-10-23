import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://api.github.com/graphql": {
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    },
  ],
  documents: "./src/**/*.gql",
  generates: {
    "./src/generated/index.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-query"],
      config: {
        fetcher: {
          endpoint: `${process.env.APP_GITHUB_API_ROOT_URL}`,
        },
        skipTypename: true,
        avoidOptionals: false,
        exposeFetcher: true,
      },
    },
  },
};
export default config;
