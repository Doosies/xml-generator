import React from 'react';
import { TableWrap } from '../styles/Table.style';
import '../styles/Table.style.ts';

export interface TTableData {
  id: string;
  columns: TTableColumns[];
}

export interface TTableColumns {
  render: React.ReactNode;
  key: string;
}

interface TableProps {
  headers: string[];
  rows: TTableData[];
}
// interface Tablle
const Table = ({ headers, rows }: TableProps) => {
    return (
    <TableWrap>
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={`T_${header}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ columns, id }) => (
            <tr key={id}>
              {columns.map(({ key, render }) => (
                <td key={key}>{render}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
};

export default Table;
