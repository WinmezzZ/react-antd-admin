import { ServiceDetailParams, ServiceDetailResult } from '~/interface/app-service/service.interface';

import { request } from '../request';

/** 服务详情 */
export const apiServiceDetail = (data: ServiceDetailParams) =>
  request<ServiceDetailResult>('get', 'Service.Detail', { ...data, api_ccenter_app: 'service' });
