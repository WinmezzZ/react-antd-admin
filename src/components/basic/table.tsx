import React, { FC } from 'react';
import MyTableColumn from 'components/core/table-column';
import { Table } from 'antd';

declare module 'antd' {
  interface Table {
    Column: typeof MyTableColumn;
  }
}

const MyTable: FC = props => {
  return <Table {...props} />;
};

Object.assign(MyTable, Table, { Column: MyTableColumn });

type TableType = typeof Table;

interface MyFormInterface extends TableType {}

export default MyTable as MyFormInterface;
