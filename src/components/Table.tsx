import React from 'react';

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
  console.log(rows);
  return (
    <>
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
    </>
  );
};

export default Table;
