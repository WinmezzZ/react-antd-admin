import { AgentConnStatusEnum } from '~/config/enum/agent-conn-status.enum';

export interface ApiNodeListParams {
  _pageNumber: number;
  _pageSize: number;
  /** 关键字，搜索SSHHostname或NodeName */
  Keyword?: string;
  /** 节点分组ID */
  NodeGroupId?: string;
  /** 节点ID */
  NodeId?: string;
  /** 节点名称，支持模糊匹配 */
  NodeName?: string;
  /** SSH主机名 */
  SSHHostname?: string;
  /** SSH验证方法，password或publickey */
  SSHAuthMethod?: string;
  /** 是否总是包含本地节点，Y/N */
  AlwaysIncludeLocal?: 'Y' | 'N';
  /** 受控端是否有更新，Y/N */
  AgentIsUpgradable?: 'Y' | 'N';
  /** 受控端连接状态 */
  AgentConnStatus?: 'online' | 'offline' | 'checking';
}

export interface NodeItem extends PerformanceItem {
  AgentConnError: string;
  AgentConnStatus: keyof typeof AgentConnStatusEnum;
  AgentConnectAdminStatus: string;
  AgentConnectDomainName: string;
  AgentConnectHostname: string;
  AgentConnectMethod: string;
  AgentConnectPort: number;
  AgentConnectProtocol: string;
  AgentConnectSignKey: string;
  AgentIsUpgradable: string;
  AgentLatestVersion: string;
  AgentRunningVersion: string;
  AgentVersion: string;
  BaseArch: string;
  IsDefault: YN;
  NodeGroupId: number;
  NodeGroupName: string;
  NodeId: number;
  NodeName: string;
  NodeType: string;
  OS: string;
  OSRelease: string;
  OSVersion: string;
  SSHAuthMethod: string;
  SSHHostname: string;
  SSHIdentityFile: string;
  SSHIdentityFilePassphrase: string;
  SSHPassword: string;
  SSHPort: number;
  SSHUsername: string;
  ShowIndex: number;
}

export type NodeList = NodeItem[];

export interface ApiNodeListResult {
  NodeList: NodeList;
  PageCount: number;
  PageNumber: number;
  PageSize: number;
  ShowIndex: {
    next: number;
    prev: number;
  };
  TotalCount: number;
}

interface PerformanceItem {
  CPUUseRate: number;
  RealMemUsed: string;
  MemTotal: string;
  RealMemUseRate: number;
  RXSpeed: string;
  TXSpeed: string;
  DiskUsed: string;
  DiskTotal: string;
  DiskUseRate: number;
}

export interface PerformanceResult {
  [x: string]: {
    Performance: [
      PerformanceItem['CPUUseRate'],
      PerformanceItem['RealMemUsed'],
      PerformanceItem['MemTotal'],
      PerformanceItem['RealMemUseRate'],
      PerformanceItem['RXSpeed'],
      PerformanceItem['TXSpeed'],
      PerformanceItem['DiskUsed'],
      PerformanceItem['DiskTotal'],
      PerformanceItem['DiskUseRate'],
    ];
  };
}
