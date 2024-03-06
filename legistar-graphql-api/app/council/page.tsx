"use client";

import React from 'react';
import { NextPage } from 'next';
import { Button, Cell, Column, Row, Table, TableBody, TableHeader, type TableProps } from 'react-aria-components';

interface Column {
  name: string;
  id: 'name' | 'type' | 'date';
  isRowHeader?: boolean;
}

import type { ColumnProps } from 'react-aria-components';

function MyColumn(props: ColumnProps) {
  return (
    <Column {...props}>
      {({ allowsSorting, sortDirection }) => <>
        {props.children}
        {allowsSorting && (
          <span aria-hidden="true" className="sort-indicator">
            {sortDirection === 'ascending' ? '▲' : '▼'}
          </span>
        )}
      </>}
    </Column>
  );
}

import type { CheckboxProps, RowProps, TableHeaderProps } from 'react-aria-components';
import { Checkbox, Collection, useTableOptions } from 'react-aria-components';

function MyTableHeader<T extends object>(
  { columns, children }: TableHeaderProps<T>
) {
  let { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();

  return (
    <TableHeader>
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <Column />}
      {selectionBehavior === 'toggle' && (
        <Column>
          {selectionMode === 'multiple' && <MyCheckbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>
        {children}
      </Collection>
    </TableHeader>
  );
}

function MyRow<T extends object>(
  { id, columns, children, ...otherProps }: RowProps<T>
) {
  let { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <Row id={id} {...otherProps}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === 'toggle' && (
        <Cell>
          <MyCheckbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>
        {children}
      </Collection>
    </Row>
  );
}

function MyCheckbox({ children, ...props }: CheckboxProps) {
  return (
    <Checkbox {...props}>
      {({ isIndeterminate }) => (
        <>
          <div className="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate
                ? <rect x={1} y={7.5} width={15} height={3} />
                : <polyline points="1 9 7 14 15 4" />}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
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

