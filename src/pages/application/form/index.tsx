import React, { FC, useState } from 'react'
import { Form, Row, Col, Button, Input } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import './index.less'
import { ColProps } from 'antd/lib/col'

interface FormState {
  a: string
  b: string
  c: string
  d: string
  e: string
}

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6
}

const labelCol: ColProps = {
  span: 2
}

const layout = {
  wrapperCol,
  labelCol
}

const FormPage: FC = (a, b) => {
  const [expand, setExpand] = useState(false)
  const [form] = Form.useForm()

  const onFinished = (values: any) => {
    console.log(values)
  }
  return (
    <div className="form-page" {...layout}>
      <Form className="form-page-form" form={form} name="form" onFinish={onFinished}>
        <Form.Item name="a" label="a">
          <Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item name="b" label="b">
          <Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item name="c" label="d">
          <Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item name="e" label="e">
          <Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item name="f" label="f">
          <Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item name="g" label="g">
          <Input placeholder="placeholder" />
        </Form.Item>
        <div className="form-action">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              form.resetFields()
            }}
          >
            Clear
          </Button>
          <a
            style={{ marginLeft: 8, fontSize: 12 }}
            onClick={() => {
              setExpand(!expand)
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} Collapse
          </a>
        </div>
      </Form>
    </div>
  )
}
export default FormPage
