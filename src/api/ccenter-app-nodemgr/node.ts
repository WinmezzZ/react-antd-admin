import { useEffect } from 'react';

import { ApiNodeListParams, NodeList, PerformanceResult } from '~/interface/ccenter-app-nodemgr/node.interface';
import { NodeMenuList, NodeMenuListParams } from '~/interface/ccenter-app-nodemgr/node-menu.interface';
import { Pagination } from '~/interface/common/pagination.interface';

import { request } from '../request';
import { SocketEffect, useSocket } from '../socket';

/** 桌面菜单接口 */
export const apiNodeList = (data?: ApiNodeListParams) =>
  request<Pagination<'NodeList', NodeList>>('get', 'Node.List', { ...data, api_ccenter_app: 'nodemgr' });

/** 节点菜单接口 */
export const apiNodeMenuList = (data: NodeMenuListParams) =>
  request<NodeMenuList>('get', 'Node.InitMenu', { ...data, api_ccenter_app: 'nodemgr' });

export const usePerformance: SocketEffect<PerformanceResult, { nodeIds: string[] }> = (cb, { nodeIds }) => {
  const socket = useSocket(
    'Node.SubscribePerformance',
    {
      api_ccenter_app: 'nodemgr',
    },
    {
      onMessage: e => {
        cb(JSON.parse(e.data));
      },
    },
  );

  useEffect(() => {
    if (!nodeIds.length) return;
    if (!socket) return;
    socket.sendJsonMessage({ a: 'watch', d: { NodeId: nodeIds } });
    socket.sendJsonMessage({
      a: 'subscribe',
      d: {
        Performance: [
          'CPUUseRate',
          'MemUsed',
          'MemTotal',
          'RealMemUseRate',
          'RXSpeed',
          'TXSpeed',
          'DiskUsed',
          'DiskTotal',
          'DiskUseRate',
        ],
      },
    });
  }, [nodeIds]);

  return socket;
};
