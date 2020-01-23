import React, { FC, useState } from 'react'
import { Form, Row, Col, Button, Input, Radio } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import './index.less'
import { ColProps } from 'antd/lib/col'
import { RadioChangeEvent } from 'antd/lib/radio'

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

// const labelCol: ColProps = {
//   span: 2
// }

// const layout = {
//   wrapperCol,
//   labelCol
// }

type FormMode = 'search' | 'validate'

const FormPage: FC<{ dialog?: boolean }> = ({ dialog }) => {
  const [mode, setMode] = useState<FormMode>('search')
  const [expand, setExpand] = useState(false)
  const [form] = Form.useForm()

  const onFinished = (values: any) => {
    console.log(values)
  }

  const handleModeChange = (e: RadioChangeEvent) => {
    const mode: FormMode = e.target.value
    setMode(mode)
  }

  const formNode = (
    <Form
      className="form-page-form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      form={form}
      name="form"
      onFinish={onFinished}
    >
      <Row gutter={24}>
        <Col {...wrapperCol}>
          <Form.Item name="a" label="a" rules={[{ required: mode === 'validate', message: '请输入a' }]}>
            <Input placeholder={mode === 'validate' ? '请输入a' : ''} />
          </Form.Item>
        </Col>
        <Col {...wrapperCol}>
          <Form.Item name="b" label="b" rules={[{ required: mode === 'validate', message: '请输入b' }]}>
            <Input placeholder={mode === 'validate' ? '请输入b' : ''} />
          </Form.Item>
        </Col>
        <Col {...wrapperCol}>
          <Form.Item name="c" label="c" rules={[{ required: mode === 'validate', message: '请输入c' }]}>
            <Input placeholder={mode === 'validate' ? '请输入c' : ''} />
          </Form.Item>
        </Col>
        <Col {...wrapperCol}>
          <Form.Item name="d" label="d" rules={[{ required: mode === 'validate', message: '请输入d' }]}>
            <Input placeholder={mode === 'validate' ? '请输入d' : ''} />
          </Form.Item>
        </Col>
        <Col {...wrapperCol}>
          <Form.Item name="e" label="e" rules={[{ required: mode === 'validate', message: '请输入e' }]}>
            <Input placeholder={mode === 'validate' ? '请输入d' : ''} />
          </Form.Item>
        </Col>
        <Col {...wrapperCol}>
          <Form.Item name="f" label="f" rules={[{ required: mode === 'validate', message: '请输入f' }]}>
            <Input placeholder={mode === 'validate' ? '请输入e' : ''} />
          </Form.Item>
        </Col>
        {expand && (
          <>
            <Col {...wrapperCol}>
              <Form.Item name="g" label="g" rules={[{ required: mode === 'validate', message: '请输入g' }]}>
                <Input placeholder={mode === 'validate' ? '请输入f' : ''} />
              </Form.Item>
            </Col>
            <Col {...wrapperCol}>
              <Form.Item name="h" label="h" rules={[{ required: mode === 'validate', message: '请输入h' }]}>
                <Input placeholder={mode === 'validate' ? '请输入h' : ''} />
              </Form.Item>
            </Col>
            <Col {...wrapperCol}>
              <Form.Item name="i" label="i" rules={[{ required: mode === 'validate', message: '请输入i' }]}>
                <Input placeholder={mode === 'validate' ? '请输入i' : ''} />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>
      {!dialog && (
        <div className="form-action">
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              form.resetFields()
            }}
          >
            重置
          </Button>
          <a
            style={{ marginLeft: 8, fontSize: 12 }}
            onClick={() => {
              setExpand(!expand)
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />}
            {expand ? '收起' : '展开'}
          </a>
        </div>
      )}
    </Form>
  )
  if (dialog) {
    return formNode
  }
  return (
    <div className="form-page">
      <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
        <Radio.Button value="search">搜索表单</Radio.Button>
        <Radio.Button value="validate">验证表单</Radio.Button>
      </Radio.Group>
      {formNode}
    </div>
  )
}

FormPage.defaultProps = {
  dialog: false
}

export default FormPage
