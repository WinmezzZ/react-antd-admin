import Mock from 'mockjs';
import { Response } from '../api/request';

Mock.setup({
  timeout: 300
});

// Mock the real back-end api structure.
export function intercepter<T>(data: T): Response<T> {
  return {
    status: true,
    message: '成功',
    result: data
  };
}

export const mock = Mock;
