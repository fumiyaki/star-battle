export function fetchData<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
    const key = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;
    if (!endpoint || !key) {
      throw new Error(
        "ServerにアクセスするためのURLかアクセスKeyが正しくセットされていません。"
      );
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: key,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
