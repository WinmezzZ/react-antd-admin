import Mock from 'mockjs';
import { defineMock } from 'vite-plugin-mock-dev-server';

import { defaultUserList } from '../config/constants';

const Random = Mock.Random;

const productList = new Array(10).fill(null).map(() => ({
  id: Random.integer(10000000, 99999999),
  productName: Random.ctitle(10, 15),
  storeName: Random.ctitle(5, 10),
  price: Random.integer(20, 50),
  asset: Random.float(200, 500000, 1, 6),
  married: Random.boolean(),
  date: Random.datetime('yyyy-MM-dd') + ' 至 ' + Random.datetime('yyyy-MM-dd'), // 值是指定格式的日期字符串
  createDate: Random.datetime('yyyy-MM-dd HH:mm:ss'),
  addr: `${Random.province()}-${Random.city()}-${Random.county()}`,
  email: Random.email('qq.com'),
}));

export default defineMock([
  {
    url: '/api/product/list',
    method: 'POST',
    delay: 1000,
    body({}) {
      return {
        code: 200,
        data: Mock.mock({
          data: [],
        }),
      };
    },
  },
  {
    url: '/api/product/:id',
    method: 'GET',
    delay: 1000,
    body({ params }) {
      return {
        code: 200,
        data: productList.find(item => item.id === params.id),
      };
    },
  },
  {
    url: '/api/user/login',
    method: 'POST',
    delay: 1000,

    body({ body }) {
      return true;
    },
  },
]);
