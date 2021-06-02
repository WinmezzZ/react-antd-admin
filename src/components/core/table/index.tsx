import React, { FC } from 'react';
import TableColumn from '../table-column';
import { Table } from 'antd';

const BaseTable: FC = props => {
  return <Table {...props} />;
};

const MyTable = Object.assign(Table, BaseTable, { Column: TableColumn });

export default MyTable;
