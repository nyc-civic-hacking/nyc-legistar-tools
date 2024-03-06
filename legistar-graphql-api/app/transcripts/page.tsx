import React from "react";
import { Transcript } from "@/graphql/types";
import TranscriptInput from "./components/TranscriptInput";
import { GET_TRANSCRIPTS_QUERY } from "./queries";
import TranscriptTable from "./components/TranscriptTable";
import { getTranscripts } from "./actions";

const Transcripts: React.FC = async () => {
  const formData = new FormData();
  formData.set("year", "Y2024");
  formData.set("month", "January");
  const transcripts = await getTranscripts(formData);
  return (
    <>
      {/* <TranscriptInput /> */}
      <TranscriptTable transcripts={transcripts} />
    </>
  );
};

export default Transcripts;
