import React, { FC } from 'react';
import TableColumn from '../table-column';
import { Table } from 'antd';

const MyTable: FC = props => {
  return <Table {...props} />;
};

export default Object.assign(MyTable, Table, { Column: TableColumn });
