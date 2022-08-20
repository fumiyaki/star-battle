module.exports = {
  schema: [
    {
      [process.env.NEXT_PUBLIC_GRAPHQL_API_URL]: {
        headers: { authorization: process.env.NEXT_PUBLIC_GRAPHQL_API_KEY },
      },
    },
  ],
  documents: ["./src/graphql-codegen/*.graphql"],
  overwrite: true,
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        fetcher: {
          func: "../graphql-codegen/customFetcher#fetchData",
          isReactHook: false,
        },
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
