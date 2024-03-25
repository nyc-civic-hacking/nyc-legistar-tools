import React from "react";
import { Form, useSearchParams } from "@remix-run/react";

const years = [...Array.from(Array(26).keys()).map(idx => idx + 1999).map(year => `Y${year}`)]
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const TranscriptFilterForm: React.FC = () => {
  const [params] = useSearchParams();
  const defaultYear = params.get('year') || `Y${new Date().getFullYear().toString()}`;
  const defaultMonth = params.get('month') || new Date().toLocaleString('default', { month: 'long' });

  return (
    <Form method="get" action="/transcripts">
      <select name="year" defaultValue={defaultYear} required>
        {years.reverse().map((year) => {
          return (
            <option key={year} value={year}>{year}</option>
          );
        })}
      </select>
      <select name="month" defaultValue={defaultMonth}>
        {months.map((month) => {
          return (
            <option key={month} value={month}>{month}</option>
          );
        })}
      </select>
      <button type="submit">Submit</button>
    </Form>
  );
};
