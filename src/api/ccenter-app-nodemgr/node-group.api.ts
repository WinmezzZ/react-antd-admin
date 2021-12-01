import { ApiNodeGroupListParams, NodeGroupList } from '~/interface/ccenter-app-nodemgr/node-group.interface';
import { Pagination } from '~/interface/common/pagination.interface';

import { request } from '../request';

/** 节点分组列表 */
export const apiNodeGroupList = (data: ApiNodeGroupListParams) =>
  request<Pagination<'NodeGroupList', NodeGroupList>>('get', 'NodeGroup.List', { ...data, api_ccenter_app: 'nodemgr' });
