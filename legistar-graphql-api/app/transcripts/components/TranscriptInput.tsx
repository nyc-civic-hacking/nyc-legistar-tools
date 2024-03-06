"use client";

import React, { useState } from "react";
import { Transcript } from "@/graphql/types";
import TranscriptTable from "./TranscriptTable";

type TranscriptInputProps = {
  initialTranscripts: Transcript[];
  getTranscripts: (year?: string, month?: string) => Promise<Transcript[]>;
};

const TranscriptInputs: React.FC<TranscriptInputProps> = ({
  initialTranscripts,
  getTranscripts,
}) => {
  const [transcripts, setTranscripts] = useState(initialTranscripts);
  const [year, setYear] = useState("Y" + new Date().getFullYear());
  const [month, setMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  const handleSubmit = async () => {
    alert("CLICKED");
    // const updatedTranscripts = await getTranscripts(year, month)
    // setTranscripts(updatedTranscripts)
  };

  return (
    <>
      <select
        name="year"
        defaultValue={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="Y2024">Y2024</option>
        <option value="Y2023">Y2023</option>
        <option value="Y2022">Y2022</option>
        <option value="Y2021">Y2021</option>
      </select>
      <select
        name="month"
        defaultValue={month}
        onChange={(e) => setMonth(e.target.value)}
      >
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
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      <TranscriptTable transcripts={transcripts} />
    </>
  );
};

export default TranscriptInputs;
