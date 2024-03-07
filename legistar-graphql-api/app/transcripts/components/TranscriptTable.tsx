"use client";

import React from "react";
import { Transcript } from "@/graphql/types";
import { Table, TableBody, TableHeader, Column, Row, Cell, SortDescriptor } from "react-aria-components";
import type { Column as _Column } from "@/app/council/page";

type TranscriptTableProps = {
  transcripts: Transcript[];
};

type ColumnName = 'Name' | 'Date' | 'Link';

interface TranscriptColumn {
  name: string;
  id: ColumnName;
  isRowHeader?: boolean;
  allowsSorting?: boolean;
}

const TranscriptTable: React.FC<TranscriptTableProps> = ({
  transcripts,
}) => {
  let [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'Date',
    direction: 'ascending'
  });

  let columns: TranscriptColumn[] = [
    { name: 'Name', id: 'Name', isRowHeader: true, allowsSorting: true },
    { name: 'Date', id: 'Date', allowsSorting: true },
    { name: 'Link', id: 'Link', allowsSorting: true }
  ];

  let rows = transcripts.map(transcript => ({ ...transcript, id: transcript.Id })).sort((a, b) => {
    // if the column is not in ColumnName, then "as ColumnName" typecast is unsafe, so we need to handle that case.
    if (!['Name', 'Link', 'Date'].includes(sortDescriptor.column?.toString() || "")) return 0;
    let d = a[sortDescriptor.column as ColumnName].localeCompare(b[sortDescriptor.column as ColumnName]);
    return sortDescriptor.direction === 'descending' ? -d : d;
  });

  return (
    <Table sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor} className="table table-xs" aria-label="Files">
      <TableHeader columns={columns}>
        {column => (
          <Column isRowHeader={column.isRowHeader} allowsSorting={column.allowsSorting}>
            {column.name}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {item => (
          <Row>
            <Cell>{item.Name}</Cell>
            <Cell>{new Date(item.Date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric' })}</Cell>
            <Cell><a className="link-primary" href={item.Link}>{item.Link}</a></Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );

};

export default TranscriptTable;
