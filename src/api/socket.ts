import { useEffect } from 'react';
import useWebSocket, { Options } from 'react-use-websocket';

import { PerformanceResult } from '~/interface/ccenter-app-nodemgr/node.interface';
import store from '~/store';

const isDev = import.meta.env.DEV;
const proxyPath = isDev ? '/socket' : '';

export function useSocket(action: string, query: Record<string, any>, options: Options = {}) {
  const token = store.getState().user.CSRFToken || '';
  const commonQuery = {
    IgnoreDefaultFields: 'Y',
    api_csrf_token: token,
  };

  if (!token) return;
  const url = `ws://${location.host}${proxyPath}/api?api_action=${action}&${new URLSearchParams(
    Object.assign(commonQuery, query),
  )}`;
  const socket = useWebSocket(url, options);

  return socket;
}

interface SocketResponse<T> {
  a: string;
  d: T;
}

export interface SocketEffect<Res, Req> {
  (callback: (res: SocketResponse<Res>) => void, query: Req, options?: Options): void;
}

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
