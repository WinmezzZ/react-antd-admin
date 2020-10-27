import React, { FC } from 'react';
import { Role } from 'interface/permission/role.interface';
import useGetRoleFormItem from './useGetRoleForm';
import { Button } from 'antd';
import { useLocale } from 'locales';

export interface Values extends Role {}

const RoleSearch: FC = () => {
  const { Form, form, Name, Code, Status } = useGetRoleFormItem({ name: 'searchForm', responsive: true });
  const { formatMessage } = useLocale();

  const onSearch = () => {
    //
  };

  return (
    <Form>
      <Name />
      <Code />
      <Status />
      <Form.Item>
        <Button type="primary" onClick={onSearch}>
          {formatMessage({ id: 'gloabal.tips.search' })}
        </Button>
        <Button onClick={() => form.resetFields()}>{formatMessage({ id: 'gloabal.tips.reset' })}</Button>
      </Form.Item>
    </Form>
  );
};

export default RoleSearch;
