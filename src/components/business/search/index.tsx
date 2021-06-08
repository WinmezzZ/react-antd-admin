import React from 'react';
import { Row, Col } from 'antd';
import MyForm, { MyFormProps } from 'components/core/form';
import MyButton from 'components/basic/button';
import { ColProps } from 'antd/lib/grid';

interface SearchProps<T> extends MyFormProps<T> {
  onSearch: (values: T) => void;
}

const colSpan: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 6,
  xxl: 4
};

const MySearch = <T extends object>(props: SearchProps<T>) => {
  const { children, onSearch, ...rest } = props;
  const [form] = MyForm.useForm<T>();

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values) {
      onSearch(values);
    }
  };

  return (
    <div className="my-search">
      <MyForm {...rest} form={form}>
        <Row gutter={24}>
          {Array.isArray(children)
            ? children.map((child, index) => (
                <Col {...colSpan} key={index}>
                  {child}
                </Col>
              ))
            : null}
        </Row>
        <Row gutter={24}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <MyForm.Item>
              <MyButton type="primary" onClick={onSubmit}>
                查询
              </MyButton>

              <MyButton onClick={() => form.resetFields()}>重置</MyButton>
            </MyForm.Item>
          </Col>
        </Row>
      </MyForm>
    </div>
  );
};

export default MySearch;
