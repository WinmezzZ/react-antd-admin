import { PageParams } from '../common/pagination.interface';

export interface ApiNodeGroupListParams extends PageParams, Partial<NodeGroupItem> {}

export interface NodeGroupItem {
  /** 节点分组ID */
  NodeGroupId: string;
  /** 节点分组名称，支持模糊匹配 */
  NodeGroupName: string;
  /** 是否默认 */
  IsDefault: YN;
}

export type NodeGroupList = NodeGroupItem[];
