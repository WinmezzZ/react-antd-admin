import type { MySideOption } from '@/components/business/aside';
import type { MyPageTableOptions } from '@/components/business/page';
import type { BuniesssUser } from '@/interface/business';
import type { FC } from 'react';

import { Space, Tag } from 'antd';

import { getBusinessUserList } from '@/api/business';
import MyButton from '@/components/basic/button';
import MyPage from '@/components/business/page';

const { Item: SearchItem } = MyPage.MySearch;

const asideOptions: MySideOption[] = [
  {
    title: 'Tab-1',
    key: 1,
  },
  {
    title: 'Tab-2',
    key: 2,
  },
  {
    title: 'Tab-3',
    key: 3,
  },
];

const tableColums: MyPageTableOptions<BuniesssUser> = [
  {
    title: 'Name',
    children: [
      { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
      { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    ],
  },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags, record) => (
      <>
        {record.tags.map(tag => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <MyButton type="text">Invite {record.lastName}</MyButton>
        <MyButton type="text">Delete</MyButton>
      </Space>
    ),
  },
];

const BusinessWithAsidePage: FC = () => {
  return (
    <MyPage
      pageApi={getBusinessUserList}
      asideData={asideOptions}
      asideKey="key"
      searchRender={
        <>
          <SearchItem label="FirstName" name="firstName" type="input" />
          <SearchItem label="FirstName" name="firstName1" type="input" />
          <SearchItem label="FirstName" name="firstName2" type="input" />
          <SearchItem label="FirstName" name="firstName3" type="input" />
          <SearchItem label="FirstName" name="firstName4" type="input" />
          <SearchItem label="FirstName" name="firstName5" type="input" />
          <SearchItem label="FirstName" name="firstName6" type="input" />
          <SearchItem label="FirstName" name="firstName7" type="input" />
          <SearchItem label="FirstName" name="firstName8" type="input" />
          <SearchItem label="FirstName" name="firstName9" type="input" />
          <SearchItem label="FirstName" name="firstName10" type="input" />
        </>
      }
      tableOptions={tableColums}
    ></MyPage>
  );
};

export default BusinessWithAsidePage;
