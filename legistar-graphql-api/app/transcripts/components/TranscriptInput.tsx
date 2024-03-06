"use client";

import { useFetcher } from "next/navigation";
import React from "react";

const TranscriptInputs: React.FC = () => {
  const fetcher = useFetcher();

  return (
    <>
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
    </>
  );
};

export default TranscriptInputs;
