import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Row, Select, Space, Table } from 'antd';
import axios from 'axios';
import { css } from '@emotion/react';

const styles = css`
  display: flex;
  flex-direction: column;
  .tabs-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .search {
    margin-bottom: 10px;
  }

  .aside-main {
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    @media screen and (max-height: 800px) {
      overflow: auto;
    }
  }

  .table {
    flex: 1;
    overflow: hidden;
    @media screen and (max-height: 800px) {
      overflow: auto;
      min-height: 500px;
    }
  }
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const columns = [
  {
    title: 'Season',
    dataIndex: 'season',
    key: 'season',
  },
  {
    title: 'Episode',
    dataIndex: 'episode',
    key: 'episode',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Scene',
    dataIndex: 'scene',
    key: 'scene',
  },
  {
    title: 'Speaker',
    dataIndex: 'speaker',
    key: 'speaker',
  },
  {
    title: 'Line',
    dataIndex: 'line',
    key: 'line',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'Match method',
    dataIndex: 'method',
    key: 'method',
  },
];

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [responseData, setResponseData] = useState<any[]>(() => {
    // Initialize state from localStorage
    const saved = localStorage.getItem('the-office-line-search');
    return saved ? JSON.parse(saved) : [];
  });
  // const [responseData, setResponseData] = useState<any[]>([]); // State for API response as an array

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem('the-office-line-search', JSON.stringify(responseData));
  }, [responseData]);

  const handleSearch = async (query: any, limit: any) => {
    try {
      const response = await axios.get(
        `https://caojilin-python-api.vercel.app/api/py/rapidfuzz?query=${query}&limit=${limit.toString()}`,
      );
      // const response = await axios.get(
      //     `http://127.0.0.1:8000/api/py/rapidfuzz?query=${query}&limit=${limit.toString()}`,
      // );

      // Transform the response object into an array of rows
      const data = Object.values(response.data);
      setResponseData(data);
      console.log('API Response:', data);
    } catch (error) {
      console.error('API Request Failed:', error);
    }
  };
  const onFinish = (values: any) => {
    console.log(values);
    const response = handleSearch(values.query, values.limit);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ query: 'out of your hands', limit: 5 });
  };

  return (
    <div css={styles}>
      <>
        <Row>
          <Col span={24}>
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              initialValues={{ query: '', limit: 5 }}
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
            >
              <Form.Item name="query" label="query" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="limit" label="limit" rules={[{ required: false }]}>
                <InputNumber />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                  <Button type="link" htmlType="button" onClick={onFill}>
                    Fill form
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              style={{ marginTop: '-20px' }}
              dataSource={responseData.map((item, index) => ({
                ...item,
                key: index, // Add a unique key for each row
              }))}
              pagination={{ pageSize: 10 }} // Optional pagination
            />
          </Col>
        </Row>
      </>
    </div>
  );
};

export default App;
