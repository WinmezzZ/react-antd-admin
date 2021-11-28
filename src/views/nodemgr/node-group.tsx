import { Table } from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { Button } from 'antd';
import { FC } from 'react';

import { apiNodeGroupList } from '~/api/ccenter-app-nodemgr/node-group.api';
import { useTable } from '~/hooks/usePagination';
import { NodeGroupItem } from '~/interface/ccenter-app-nodemgr/node-group.interface';

const NodeGroupListPage: FC = () => {
  const { tableData, loading } = useTable({
    apiMethod: apiNodeGroupList,
    resultListKeyPath: 'NodeGroupList',
    pageSize: 100,
  });

  return (
    <Table
      style={{ width: 500 }}
      bordered
      columns={columns}
      dataSource={tableData}
      pagination={false}
      loading={loading}
    />
  );
};

const columns: ColumnProps<NodeGroupItem>[] = [
  {
    title: '节点分组',
    dataIndex: 'NodeGroupName',
    render: (data, row) => (
      <div>
        <span>{data}</span>
        <span>{row.IsDefault === 'Y' ? '（默认分组）' : ''}</span>
      </div>
    ),
  },
  {
    title: '操作',
    width: 160,
    render(_, _row) {
      return <Button type="primary">修改</Button>;
    },
  },
];

export default NodeGroupListPage;
