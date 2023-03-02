import type { Response } from '../api/request';
import type { PageData } from '@/interface';

import Mock from 'mockjs';

import { getTableData } from '@/utils/get-table-page-data';

Mock.setup({
  timeout: 300,
});

export type ArrayElementType<T> = T extends (infer U)[] ? U : any; // Mock the real back-end api structure.

interface PageParams {
  pageSize?: number;
  pageNum?: number;
}

export function intercepter<T>(data: T): Response<T>;
export function intercepter<T extends any[]>(data: T, page: PageParams): Response<PageData<T>>;

export function intercepter(data: any, page?: PageParams) {
  if (page) {
    const result = getTableData(Number(page.pageNum), Number(page.pageSize), data);

    return {
      status: true,
      message: '成功',
      result,
    };
  } else {
    return {
      status: true,
      message: '成功',
      result: data,
    };
  }
}

export const mock = Mock;
