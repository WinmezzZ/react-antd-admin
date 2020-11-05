import React, { FC } from 'react';
import { Form, Input, Col, Row, Select } from 'antd';
import { useLocale } from 'locales';
import { ColProps } from 'antd/lib/col';
import { FormProps } from 'antd/lib/form';
import { useAppState } from 'stores';
import { Role } from 'interface/permission/role.interface';

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

interface Props {
  /** form name */
  name: string;
  /** Form item required? */
  required?: boolean;
  /** search form need responsive layout */
  responsive?: boolean;
  /** Initial form data */
  values?: Role;
}

export default function useGetRoleForm({ required = false, responsive = false, name = 'form', values }: Props) {
  const { formatMessage } = useLocale();
  const [formInstance] = Form.useForm<FormProps>();

  const _Form: FC<FormProps> = ({ children, ...props }) => {
    const { device } = useAppState(state => state.user);

    return (
      <Form
        {...props}
        {...(device === 'MOBILE' ? { layout: 'vertical' } : layout)}
        form={formInstance}
        name={name}
        initialValues={values}
      >
        {responsive ? <Row>{children}</Row> : children}
      </Form>
    );
  };

  type InternalForm = typeof _Form;
  interface Forms extends InternalForm {
    Item: typeof Form.Item;
  }

  const WrappedForm: Forms = _Form as Forms;

  WrappedForm.Item = Form.Item;

  const Name: FC = () => {
    const name = (
      <Form.Item
        name="name"
        label={formatMessage({ id: 'app.permission.role.name' })}
        rules={[{ required, message: formatMessage({ id: 'app.permission.role.nameRequired' }) }]}
      >
        <Input />
      </Form.Item>
    );

    return responsive ? <Col {...wrapperCol}>{name}</Col> : name;
  };

  const Code: FC = () => {
    const code = (
      <Form.Item
        name="code"
        label={formatMessage({ id: 'app.permission.role.code' })}
        rules={[{ required, message: formatMessage({ id: 'app.permission.role.codeRequired' }) }]}
      >
        <Input />
      </Form.Item>
    );

    return responsive ? <Col {...wrapperCol}>{code}</Col> : code;
  };

  const Status = () => {
    const status = (
      <Form.Item
        name="status"
        label={formatMessage({ id: 'app.permission.role.status' })}
        rules={[{ required, message: formatMessage({ id: 'app.permission.role.statusRequired' }) }]}
      >
        <Select>
          <Select.Option key="all" value="all">
            {formatMessage({ id: 'app.permission.role.status.all' })}
          </Select.Option>
          <Select.Option key="enabled" value="enabled">
            {formatMessage({ id: 'app.permission.role.status.enabled' })}
          </Select.Option>
          <Select.Option key="disabled" value="disabled">
            {formatMessage({ id: 'app.permission.role.status.disabled' })}
          </Select.Option>
        </Select>
      </Form.Item>
    );

    return responsive ? <Col {...wrapperCol}>{status}</Col> : status;
  };

  return {
    form: formInstance,
    Form: WrappedForm,
    Name,
    Code,
    Status
  };
}
