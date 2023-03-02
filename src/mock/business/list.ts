import type { BuniesssUser } from '@/interface/business';

import qs from 'query-string';

import { intercepter, mock } from '../config';

const data: BuniesssUser[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

new Array(30).fill(undefined).forEach((item, index) => {
  data.push({
    key: index + 4 + '',
    firstName: 'Joe' + index,
    lastName: 'Black' + index,
    age: 32 + index,
    address: 'Sidney No. 1 Lake Park' + index,
    tags: ['cool', 'teacher'],
  });
});

mock.mock(/\/business\/list*/, 'get', (config: any) => {
  const jsonParams = config.url.split('?')[1];
  const params = qs.parse(jsonParams);

  return intercepter(data, params);
});
