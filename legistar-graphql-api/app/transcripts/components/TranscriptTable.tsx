'use client'

"use client";

import React from 'react'
import { Transcript } from '@/graphql/types'
import { Table, TableBody, TableHeader, Column, Row, Cell } from "react-aria-components";
import type { Column as _Column } from "@/app/council/page";

type TranscriptTableProps = {
    transcripts: Transcript[]
}

interface TranscriptColumn {
  name: string;
  id: 'Name' | 'Date' | 'Link';
  isRowHeader?: boolean;
}

const TranscriptTable: React.FC<TranscriptTableProps> = ({
  transcripts,
}) => {

  let columns: TranscriptColumn[] = [
    { name: 'Name', id: 'Name', isRowHeader: true },
    { name: 'Date', id: 'Date' },
    { name: 'Link', id: 'Link' }
  ];

  let rows = transcripts.map(transcript => ({ ...transcript, id: transcript.Id }));

  return (
    <Table className="table table-xs" aria-label="Files">
      <TableHeader columns={columns}>
        {column => (
          <Column isRowHeader={column.isRowHeader}>
            {column.name}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {item => (
          <Row columns={columns}>
            {column => <Cell key={column.id}>{item[column.id]}</Cell>}
          </Row>
        )}
      </TableBody>
    </Table>
  );

};

export default TranscriptTable