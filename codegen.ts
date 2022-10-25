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
          // url形式ではないときはシングル・ダブルクォートで囲む
          // https://github.com/dotansimha/graphql-code-generator/issues/7190#issuecomment-1030699022
          endpoint: '"/api/github"',
        },
        skipTypename: true,
        avoidOptionals: false,
        // 生成されるuseQueryからfetcherへアクセス可能にする
        exposeFetcher: true,
      },
    },
  },
};
export default config;
