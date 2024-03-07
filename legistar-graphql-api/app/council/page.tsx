"use client";

import React from 'react';
import { NextPage } from 'next';
import { Button, Cell, Column, Row, Table, TableBody, TableHeader, type TableProps } from 'react-aria-components';

export interface Column {
  name: string;
  id: 'name' | 'type' | 'date';
  isRowHeader?: boolean;
}


function FileTable(props: TableProps) {
  let columns: Column[] = [
    { name: 'Name', id: 'name', isRowHeader: true },
    { name: 'Type', id: 'type' },
    { name: 'Date Modified', id: 'date' }
  ];

  let rows = [
    { id: 1, name: 'Games', date: '6/7/2020', type: 'File folder' },
    { id: 2, name: 'Program Files', date: '4/7/2021', type: 'File folder' },
    { id: 3, name: 'bootmgr', date: '11/20/2010', type: 'System file' },
    { id: 4, name: 'log.txt', date: '1/18/2016', type: 'Text Document' }
  ];

  return (
    <Table className="table table-xs" aria-label="Files" {...props}>
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
            {column => <Cell>{item[column.id]}</Cell>}
          </Row>
        )}
      </TableBody>
    </Table>
  );
}

const HelloWorld: NextPage = () => {
  return (
    <div>
      <h1 className="text-5xl text-red-500">Hello, City Council Ppl!</h1>
      <FileTable />
    </div>
  );
};

export default HelloWorld;

