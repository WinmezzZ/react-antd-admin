import { IconFilledArrowDown, IconFilledArrowUp } from '@douyinfe/semi-icons';
import { Progress, Table } from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { css } from '@emotion/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { apiNodeList, usePerformance } from '~/api/ccenter-app-nodemgr/node';
import { DropMenuButton } from '~/components/drop-menu-button';
import { AgentConnStatusEnum } from '~/config/enum/agent-conn-status.enum';
import { useTable } from '~/hooks/usePagination';
import { NodeItem } from '~/interface/ccenter-app-nodemgr/node.interface';
import { history } from '~/route/history';

const getStrokeColor = (rate: number) => {
  if (rate > 0.8) {
    return '#ff0000';
  } else if (rate < 0.8 && rate > 0.5) {
    return '#ff6600';
  } else if (rate < 0.5 && rate > 0.3) {
    return '#66ccfff';
  } else {
    return '02b080';
  }
};

const NodeManageNodeListPage: FC = () => {
  const { panination, tableData, setTableData, loading } = useTable({
    apiMethod: apiNodeList,
    resultListKeyPath: 'NodeList',
  });

  usePerformance(
    res => {
      if (!tableData.length) return;
      setTableData(nodelst => {
        if (!Object.keys(res.d).length) return nodelst;

        return nodelst.map(node => {
          const item = Object.keys(res.d).find(i => +i === node.NodeId);

          if (!item) return node;

          const data = res.d[item].Performance;

          return {
            ...node,
            CPUUseRate: data[0],
            RealMemUsed: data[1],
            MemTotal: data[2],
            RealMemUseRate: data[3],
            RXSpeed: data[4],
            TXSpeed: data[5],
            DiskUsed: data[6],
            DiskTotal: data[7],
            DiskUseRate: data[8],
          };
        });
      });
    },
    {
      nodeIds: tableData.map(node => node.NodeId.toString()),
    },
  );

  return (
    <div css={styles}>
      <Table resizable bordered columns={columns} dataSource={tableData} pagination={panination} loading={loading} />
    </div>
  );
};

export default NodeManageNodeListPage;

const columns: ColumnProps<NodeItem>[] = [
  {
    title: '节点名称',
    dataIndex: 'NodeName',
    width: 'auto',
    render: (data, row) => (
      <div className="fcc">
        <Link to={`/agent/${row.NodeId}`}>{data}</Link>
        <span>{row.IsDefault === 'Y' ? '（默认）' : ''}</span>
      </div>
    ),
  },
  {
    title: '系统',
    width: 100,
    render: (_, row) => (
      <div className="fcc">
        <img src={`/src/assets/images/system/${row.OS}.png`} />
        <span>
          &nbsp;{row.OS} {row.OSRelease}
        </span>
      </div>
    ),
  },
  {
    title: '分组',
    dataIndex: 'NodeGroupName',
    width: 200,
  },
  {
    title: '受控端',
    dataIndex: 'AgentConnStatus',
    width: 100,
    render: (_, row) => AgentConnStatusEnum[row.AgentConnStatus],
  },
  {
    title: 'CPU',
    width: 100,
    render(item) {
      return (
        <div>
          <Progress
            percent={+(item.CPUUseRate * 100).toFixed(1) || 0}
            style={{ height: '8px' }}
            stroke={getStrokeColor(item.CPUUseRate)}
            showInfo={true}
          >
            {item.CPUUseRate && (item.CPUUseRate * 100).toFixed(2) + '%'}
          </Progress>
        </div>
      );
    },
  },
  {
    title: '内存',
    width: 100,
    render(item) {
      return (
        <Progress
          percent={+(item.RealMemUseRate * 100).toFixed(1) || 0}
          style={{ height: '8px' }}
          stroke={getStrokeColor(item.RealMemUseRate)}
          showInfo={true}
        >
          {item.RealMemUseRate && (item.RealMemUseRate * 100).toFixed(2) + '%'}
        </Progress>
      );
    },
  },
  {
    title: '储存',
    width: 100,
    render(item) {
      return (
        <Progress
          percent={+(item.DiskUseRate * 100).toFixed(1) || 0}
          style={{ height: '8px' }}
          stroke={getStrokeColor(item.DiskUseRate)}
          showInfo={true}
        >
          {item.DiskUseRate && (item.DiskUseRate * 100).toFixed(2) + '%'}
        </Progress>
      );
    },
  },
  {
    title: '网络',
    width: 200,
    render(item) {
      return (
        item.RXSpeed && (
          <div className="fcc">
            <IconFilledArrowUp />
            {item.RXSpeed}
            <span className="sprate"> / </span>
            <IconFilledArrowDown />
            {item.TXSpeed}
          </div>
        )
      );
    },
  },
  {
    title: '操作',
    fixed: true,
    width: 160,
    render(_, row) {
      return (
        <DropMenuButton
          size="small"
          menu={[
            { node: 'item', name: '软件管理', onClick: () => history.push(`/agent/${row.NodeId}/appmgr`) },
            { node: 'item', name: '节点设置', onClick: () => history.push(`/ccenter/nodemgr/${row.NodeId}`) },
            { node: 'item', name: '修改密码' },
            { node: 'item', name: '取消默认' },
            { node: 'divider' },
            { node: 'item', name: '重启受控端', type: 'danger' },
          ]}
          onClick={() => history.push(`/agent/${row.NodeId}`)}
        >
          进入桌面
        </DropMenuButton>
      );
    },
  },
];

const styles = css`
  .sprate {
    margin: 0 8px;
  }
  .semi-icon {
    margin-right: 4px;
  }
  .semi-icon-filled_arrow_up path {
    color: var(--semi-color-success);
  }
  .semi-icon-filled_arrow_down path {
    color: var(--semi-color-link);
  }
`;
