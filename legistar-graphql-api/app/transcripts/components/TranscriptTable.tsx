'use client'

"use client";

import React from "react";
import { Transcript } from "@/graphql/types";
import { Table, TableBody, TableHeader, Column, Row, Cell, SortDescriptor } from "react-aria-components";
import type { Column as _Column } from "@/app/council/page";

type TranscriptTableProps = {
  transcripts: Transcript[]
}

type ColumnName = 'name' | 'date' | 'link';

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
    { name: 'Name', id: 'name', isRowHeader: true, allowsSorting: true },
    { name: 'Date', id: 'date', allowsSorting: true },
    { name: 'Link', id: 'link', allowsSorting: true }
  ];

  let rows = transcripts.sort((a, b) => {
    // if the column is not in ColumnName, then "as ColumnName" typecast is unsafe, so we need to handle that case.
    if (!['name', 'link', 'date'].includes(sortDescriptor.column?.toString() || "")) return 0;
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
          <Row id={item.name}>
            <Cell>{item.name}</Cell>
            <Cell>{new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric' })}</Cell>
            <Cell><a className="link-primary" href={item.link}>{item.link}</a></Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
};

export default TranscriptTable