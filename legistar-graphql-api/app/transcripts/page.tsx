import React from "react";
import { Transcript } from "@/graphql/types";
import TranscriptInputs from "./components/TranscriptInput";
import { GET_TRANSCRIPTS_QUERY } from "./queries";

interface TranscriptResponse {
  data: {
    transcripts: Transcript[];
  };
}

const getTranscripts = async (
  yearInput?: String,
  monthInput?: String
): Promise<Transcript[]> => {
  "use server";
  const year = yearInput ? yearInput : "Y" + new Date().getFullYear();
  const month = monthInput
    ? monthInput
    : new Date().toLocaleString("default", { month: "long" });

  const graphqlQuery = {
    query: GET_TRANSCRIPTS_QUERY,
    variables: { year, month },
  };
  const response = await fetch("http://localhost:3000/api/graphql", {
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

  const res: TranscriptResponse = await response.json();

  return res.data.transcripts;
};

const Transcripts: React.FC = async () => {
  const transcripts = await getTranscripts();

  return (
    <>
      <TranscriptInputs
        initialTranscripts={transcripts}
        getTranscripts={getTranscripts}
      />
    </>
  );
};

export default Transcripts;
