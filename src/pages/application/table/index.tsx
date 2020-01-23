import React, { FC } from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 150
  },
  {
    title: '地址',
    dataIndex: 'address'
  }
]

type Row = {
  key: number
  name: string
  age: number
  address: string
}

const data: Row[] = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}

const TablePage: FC = () => {
  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 400 }}>
      <Table.Column key="name" width={150} title="姓名" dataIndex="name" />
      <Table.Column key="age" width={150} title="年龄" dataIndex="age" />
      <Table.Column key="address" title="地址" dataIndex="address" />
    </Table>
  )
}

export default TablePage
