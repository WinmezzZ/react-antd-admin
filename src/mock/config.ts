import { PageData } from 'interface';
import Mock from 'mockjs';
import { Response } from '../api/request';

Mock.setup({
  timeout: 300
});

export type ArrayElementType<T> = T extends (infer U)[] ? U : any;

const warpperPage = <T extends any[]>(data: T): PageData<T> => {
  return {
    page: 0,
    rows: 20,
    total: 0,
    data
  };
};

// Mock the real back-end api structure.
export function intercepter<T>(data: T): Response<T>;
export function intercepter<T extends any[]>(data: T, page: boolean): Response<PageData<T>>;

export function intercepter(data: any, page?: boolean) {
  if (page) {
    return {
      status: true,
      message: '成功',
      result: warpperPage(data)
    };
  } else {
    return {
      status: true,
      message: '成功',
      result: data
    };
  }
}

export const mock = Mock;
