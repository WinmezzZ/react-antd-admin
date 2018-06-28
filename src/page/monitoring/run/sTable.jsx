import React from 'react'
import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="###">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const data = [{
  key: '1',
  name: 'John',
  age: 32,
  address: 'New York ',
}, {
  key: '2',
  name: 'Jim',
  age: 42,
  address: 'London',
}, {
  key: '3',
  name: 'Joe',
  age: 32,
  address: 'Sidneyk',
}, {
  key: '4',
  name: 'Disabled',
  age: 99,
  address: 'Sidney',
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};


export default class STable extends React.Component {
  render() {
    return (
        <Table style={{width: '100%'}} rowSelection={rowSelection} size="small" columns={columns} dataSource={data} />
    )
  }
} 