const apiEndpoint =
  process.env.NODE_ENV === "development"
    ? process.env.GRAPHQL_DEV_API_ENDPOINT ?? ""
    : process.env.GRAPHQL_PROD_API_ENDPOINT ?? "";

export async function fetchGraphQL(query: string, variables = {}) {
  const res = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.LEGISTAR_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return res.json();
}
