import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: ["src/**/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/client-generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        documentMode: "string",
        useTypeImports: true,
        addInfiniteQuery: true,
        fetcher: "fetch",
        exposeQueryKeys: true,
        exposeFetcher: true,
        reactQueryVersion: 5,
      },
    },
  },
};

export default config;
