import React, { FC, useState, useEffect, useCallback } from 'react';
import { Button, Table, Tag, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useLocale, LocaleFormatter } from 'locales';
import { apiGetRoleList } from 'api/permission/role.api';
import { Role, RoleStatus } from 'interface/permission/role.interface';
import { useAppState } from 'stores';

enum TagColor {
  enabled = 'success',
  disabled = 'error'
}

interface RoleTableProps {
  onCreate: () => void;
  onModify: (row: Role) => void;
  onAuthorize: (row: Role) => void;
}

const RoleTable: FC<RoleTableProps> = ({ onCreate, onModify, onAuthorize }) => {
  const { formatMessage } = useLocale();
  const [tableData, setTableData] = useState<Role[]>();
  const { locale } = useAppState(state => state.user);

  const initData = useCallback(async () => {
    const { result, status } = await apiGetRoleList();
    if (status) {
      setTableData(result);
    }
  }, []);

  const getLocaleStatus = (status: RoleStatus) => {
    switch (status) {
      case 'enabled':
        return formatMessage({ id: 'app.permission.role.status.disabled' });
    }
  };

  useEffect(() => {
    initData();
  }, [initData]);
  return (
    <Table
      rowKey="id"
      dataSource={tableData}
      scroll={{ x: 500 }}
      title={() => (
        <Button type="primary" onClick={onCreate}>
          <LocaleFormatter id="gloabal.tips.create" />
        </Button>
      )}
    >
      <Table.Column<Role>
        title={formatMessage({ id: 'app.permission.role.name' })}
        width={100}
        render={(_, { name }) => name[locale]}
      />
      <Table.Column<Role> title={formatMessage({ id: 'app.permission.role.code' })} dataIndex="code" width={100} />
      <Table.Column<Role>
        title={formatMessage({ id: 'app.permission.role.status' })}
        width={100}
        render={(_, { status }) => <Tag color={TagColor[status]}>{getLocaleStatus(status)}</Tag>}
      />
      <Table.Column<Role>
        title={formatMessage({ id: 'gloabal.tips.operation' })}
        width={200}
        align="center"
        render={(_, row) => [
          <Button type="link" key="1" onClick={() => onAuthorize({ ...row })}>
            {formatMessage({ id: 'gloabal.tips.authorize' })}
          </Button>,
          <Button
            type="link"
            key="2"
            onClick={() =>
              onModify({
                ...row,
                name: row.name[locale] as any
              })
            }
          >
            {formatMessage({ id: 'gloabal.tips.modify' })}
          </Button>,
          <Button
            type="link"
            key="3"
            onClick={() => {
              Modal.confirm({
                icon: <ExclamationCircleOutlined />,
                title: formatMessage({ id: 'gloabal.tips.deleteConfirm' })
              });
            }}
          >
            {formatMessage({ id: 'gloabal.tips.delete' })}
          </Button>
        ]}
      />
    </Table>
  );
};

export default RoleTable;
