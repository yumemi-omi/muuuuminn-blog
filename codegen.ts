import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://api.github.com/graphql": {
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN || ""}`,
        },
      },
    },
  ],
  documents: "./src/**/*.gql",
  generates: {
    "./src/generated/types.generated.ts": {
      // https://www.the-guild.dev/graphql/codegen/plugins/typescript/typescript
      plugins: ["typescript"],
      config: {
        // Generates enum as TypeScript const assertions instead of enum.
        enumsAsConst: true,
        // Removes fragment duplicates for reducing data transfer.
        dedupeFragments: true,
        // Generates immutable types by adding readonly to properties and uses ReadonlyArray.
        immutableTypes: true,
        // This will cause the generator to avoid using TypeScript optionals (?) on types
        avoidOptionals: true,
        // Does not add __typename to the generated types, unless it was specified in the selection set.
        skipTypename: true,
        // Allows you to override the type that unknown scalars will have.
        // https://github.com/dotansimha/graphql-code-generator/issues/8517
        defaultScalarType: "unknown",
      },
    },
    "./src/generated/": {
      plugins: ["typescript-operations", "typescript-react-query"],
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "types.generated.ts",
      },
      config: {
        fetcher: "@/libs/fetcher#fetcher",
        avoidOptionals: false,
        // 生成されるuseQueryからfetcherへアクセス可能にする
        exposeFetcher: true,
        // 生成されたhooksからgetKeys関数を使用可能にする
        exposeQueryKeys: true,
        addInfiniteQuery: true,
      },
    },
  },
  hooks: {
    // https://www.the-guild.dev/graphql/codegen/docs/config-reference/lifecycle-hooks
    afterOneFileWrite: [
      "prettier --write 'src/**/*.generated.*'",
      "eslint --fix 'src/**/*.generated.*'",
    ],
  },
};
export default config;
