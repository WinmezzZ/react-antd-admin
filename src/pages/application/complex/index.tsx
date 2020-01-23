import React, { FC } from 'react'
import { Button, Slider } from 'antd'
import './index.less'
import { PlusOutlined } from '@ant-design/icons'
import ProTable, { ProColumns } from '@ant-design/pro-table'

enum Value {
  close,
  running,
  online,
  error
}

export interface TableListItem {
  key: number
  name: string
  status: string
  updatedAt: number
  createdAt: number
  progress: number
  money: number
}
const tableListDataSource: TableListItem[] = []

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: Value[Math.floor(Math.random() * 10) % 4],
    updatedAt: Date.now() - Math.floor(Math.random() * 1000),
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1
  })
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 80
  },
  {
    title: '金额',
    dataIndex: 'money',
    valueType: 'money',
    width: 150
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    width: 120,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' }
    }
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    width: 200,
    valueType: 'dateTime'
  },
  {
    title: '进度',
    key: 'progress',
    dataIndex: 'progress',
    valueType: item => ({
      type: 'progress',
      status: item.status !== 'error' ? 'active' : 'exception'
    }),
    renderFormItem: (_, { value, onChange }) => (
      <Slider value={value} onChange={onChange} tipFormatter={() => value + '%'} />
    ),
    width: 200
  },
  {
    title: '更新时间',
    key: 'update',
    width: 120,
    dataIndex: 'createdAt',
    valueType: 'date'
  },
  {
    title: '关闭时间',
    key: 'close',
    width: 120,
    dataIndex: 'updatedAt',
    valueType: 'time'
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [<a key="1">操作</a>, <a key="2">删除</a>]
  }
]

const ComplexPage: FC = () => (
  <ProTable<TableListItem>
    rowKey="key"
    columns={columns}
    request={() =>
      Promise.resolve({
        data: tableListDataSource,
        success: true
      })
    }
    pagination={{
      showSizeChanger: true
    }}
    scroll={{
      x: columns.length * 120
    }}
    dateFormatter="string"
    params={{ state: 'all' }}
    toolBarRender={() => [
      <Button key="3" type="primary">
        <PlusOutlined />
        新建
      </Button>
    ]}
  />
)

export default ComplexPage
