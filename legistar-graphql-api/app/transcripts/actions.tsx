"use server";

import { Transcript } from "@/graphql/types";
import { GET_TRANSCRIPTS_QUERY } from "./queries";

interface TranscriptResponse {
  data: {
    transcripts: Transcript[];
  };
}

export async function getTranscripts(formData: FormData) {
  const year = formData.get("year");
  const month = formData.get("month");

  const graphqlQuery = {
    query: GET_TRANSCRIPTS_QUERY,
    variables: { year, month },
  };

  const response = await fetch("http://localhost:4000/api/graphql", {
    method: "POST",
    body: JSON.stringify(graphqlQuery),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LEGISTAR_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("GraphQL request failed");
  }
  console.log(response);

  const res: TranscriptResponse = await response.json();
  return res.data.transcripts;
}
