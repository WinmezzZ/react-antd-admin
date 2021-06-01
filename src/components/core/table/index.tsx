import React, { FC } from 'react';
import TableColumn from '../table-column';
import { Table } from 'antd';

declare module 'antd' {
  interface Table {
    Column: typeof TableColumn;
  }
}

const MyTable: FC = props => {
  return <Table {...props} />;
};

Object.assign(MyTable, Table, { Column: TableColumn });

type TableType = typeof Table;

interface TableInterface extends TableType {}

export default MyTable as TableInterface;
