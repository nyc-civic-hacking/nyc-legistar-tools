import { useLoaderData, useNavigation } from "@remix-run/react";
import { fetchGraphQL } from "../../api";
import { LoaderFunctionArgs } from "@remix-run/node";
import { TranscriptFilterForm } from "./components/TranscriptFilterForm";
import TranscriptTable from "./components/TranscriptTable";

export const GET_TRANSCRIPTS_QUERY = `
query GetTranscripts($year: Year!, $month: Month) {
  transcripts(year: $year, month: $month) {
    name
    date
    link
    events {
      id
      bodyName
      date
    }
  }
}`;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const urlParams = new URLSearchParams(url.search);
  const year = urlParams.get("year") || `Y${new Date().getFullYear().toString()}`;
  const month = urlParams.get("month") || new Date().toLocaleString('default', { month: 'long' });
  const response = await fetchGraphQL(GET_TRANSCRIPTS_QUERY, { year, month });
  return {
    transcripts: response.data.transcripts,
    year,
    month,
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  return (
    <>
      <TranscriptFilterForm />
      {navigation.state === "loading" ? (
        <div>loading...</div>
      ) : (
        <TranscriptTable transcripts={data.transcripts} />
      )}
    </>
  );
}
