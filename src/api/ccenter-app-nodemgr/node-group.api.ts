import { ApiNodeGroupListParams, NodeGroupList } from '~/interface/ccenter-app-nodemgr/node-group.interface';
import { Pagination } from '~/interface/common/pagination.interface';

import { request } from '../request';

/** 桌面菜单接口 */
export const apiNodeGroupList = (data: ApiNodeGroupListParams) =>
  request<Pagination<'NodeGroupList', NodeGroupList>>('get', 'NodeGroup.List', { ...data, api_ccenter_app: 'nodemgr' });
