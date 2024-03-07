import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import { fetchGraphQL } from "../api";
import { LoaderFunctionArgs } from "@remix-run/node";

const GET_TRANSCRIPTS_QUERY = `
query GetTranscripts($year: Year!, $month: Month!) {
    transcripts(year: $year, month: $month) {
        Id
        Name
        Date
        Link
    }
}
`;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const urlParams = new URLSearchParams(url.search);
  const year = urlParams.get("year") || "Y2024";
  const month = urlParams.get("month") || "January";
  const response = await fetchGraphQL(GET_TRANSCRIPTS_QUERY, { year, month });
  return {
    transcripts: response.data.transcripts,
    year,
    month,
  };
}

function Filters() {
  return (
    <Form method="post" action="/">
      <select name="year">
        <option value="Y2024">Y2024</option>
        <option value="Y2023">Y2023</option>
        <option value="Y2022">Y2022</option>
        <option value="Y2021">Y2021</option>
      </select>
      <select name="month">
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <button type="submit">Submit</button>
    </Form>
  );
}

export default function Index() {
  const data = useLoaderData();
  const navigation = useNavigation();
  return (
    <>
      <Filters />
      {navigation.state === "loading" ? (
        <div>loading...</div>
      ) : (
        <code>{JSON.stringify(data)}</code>
      )}
    </>
  );
}
