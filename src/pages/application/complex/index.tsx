import React, { FC, useState } from 'react'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Input, Button } from 'antd'
import moment from 'moment'
import './index.less'

const columns: ProColumns[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    copyable: true
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'date',
    dataIndex: 'date',
    valueType: 'date'
  },
  {
    title: 'option',
    valueType: 'option',
    dataIndex: 'id',
    render: (text, row, index, action) => [
      <a
        key={index}
        href="###"
        onClick={() => {
          window.alert('确认删除？')
          action.reload()
        }}
      >
        delete
      </a>,
      <a
        key={index}
        href="###"
        onClick={() => {
          window.alert('确认刷新？')
          action.reload()
        }}
      >
        reload
      </a>
    ]
  }
]

const data: {
  key: string | number
  name: string
  age: string | number
  address: string
  money: number
  date: number
}[] = []
for (let i = 0; i < 46; i += 1) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 10 + i,
    money: parseFloat((10000.26 * (i + 1)).toFixed(2)),
    date: moment('2019-11-16 12:50:26').valueOf() + i * 1000 * 60 * 2,
    address: `London, Park Lane no. ${i}`
  })
}

const request = (): Promise<{
  data: {
    key: string | number
    name: string
    age: string | number
    address: string
  }[]
  success: true
}> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data,
        success: true
      })
    }, 1000)
  })

const ComplexPage: FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  return (
    <ProTable
      search={{
        collapseRender: () => [<div key="1">1</div>]
      }}
      size="small"
      columns={columns}
      url={request}
      rowKey="key"
      params={{ keyword }}
      toolBarRender={action => [
        // <Input.Search
        //   style={{
        //     width: 200
        //   }}
        //   onSearch={value => setKeyword(value)}
        // />,
        <Button
          key="1"
          onClick={() => {
            action.reload()
          }}
          type="primary"
          style={{
            marginRight: 8
          }}
        >
          刷新
        </Button>,
        <Button
          key="2"
          onClick={() => {
            action.resetPageIndex()
          }}
          type="default"
          style={{
            marginRight: 8
          }}
        >
          回到第一页
        </Button>
      ]}
      pagination={{
        defaultCurrent: 0
      }}
    />
  )
}

export default ComplexPage
