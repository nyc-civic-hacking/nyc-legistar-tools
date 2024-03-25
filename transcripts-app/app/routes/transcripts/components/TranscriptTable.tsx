import React from 'react';
import { Event, Transcript } from '../../../types';
import { Table, TableBody, TableHeader, Column, Row, Cell, SortDescriptor } from 'react-aria-components';

type TranscriptTableProps = {
  transcripts: Transcript[]
}

type ColumnName = 'name' | 'date' | 'link' | 'events';

interface TranscriptColumn {
  name: string;
  id: ColumnName;
  isRowHeader?: boolean;
  allowsSorting?: boolean;
}

const TranscriptTable: React.FC<TranscriptTableProps> = ({
  transcripts,
}) => {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'Date',
    direction: 'ascending'
  });

  const columns: TranscriptColumn[] = [
    { name: 'Transcript Name', id: 'name', isRowHeader: true, allowsSorting: true },
    { name: 'Date', id: 'date', allowsSorting: true },
    { name: 'Link', id: 'link', allowsSorting: false },
    { name: 'Associated Events', id: 'events', allowsSorting: false }
  ];

  const rows = transcripts.sort((a, b) => {
    // if the column is not in ColumnName, then 'as ColumnName' typecast is unsafe, so we need to handle that case.
    if (!['name', 'link', 'date'].includes(sortDescriptor.column?.toString() || '')) return 0;
    const columnName = sortDescriptor.column as ColumnName;
    if (columnName != 'events') {
      const d = a[columnName].localeCompare(b[columnName]);
      return sortDescriptor.direction === 'descending' ? -d : d;
    } else {
      return 0;
    }
  });

  const displayEvents = (events: Event[]): JSX.Element[] => {
    events.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });

    return events.map((event) => {
      return <div key={event.id}>{event.date.split('T')[0] + ' | ' + event.bodyName}</div>;
    })
  }

  return (
    <Table sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor} className='table table-xs' aria-label='Files'>
      <TableHeader columns={columns}>
        {column => (
          <Column isRowHeader={column.isRowHeader} allowsSorting={column.allowsSorting}>
            {column.name}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {item => (
          <Row key={item.name+'-row'} id={item.name+'-row'}>
            <Cell>{item.name}</Cell>
            <Cell>{item.date}</Cell>
            <Cell><a className='link-primary' href={item.link} target='_blank' rel='noreferrer'>{item.link}</a></Cell>
            <Cell>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {displayEvents(item.events)}
              </div>
            </Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
};

export default TranscriptTable