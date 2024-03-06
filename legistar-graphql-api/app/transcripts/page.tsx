import React from "react";
import TranscriptTable from "./components/TranscriptTable";
import { getTranscripts } from "./actions";
import { TranscriptFilterForm } from "./components/TranscriptFilterForm";

const Transcripts: React.FC = async () => {
  const formData = new FormData();
  formData.set("year", "Y2024");
  formData.set("month", "January");
  const transcripts = await getTranscripts(formData);
  return (
    <>
      <TranscriptFilterForm />
      {/* <TranscriptInput /> */}
      <TranscriptTable transcripts={transcripts} />
    </>
  );
};

export default Transcripts;
