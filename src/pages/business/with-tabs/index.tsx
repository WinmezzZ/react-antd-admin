import { Space, Tag } from 'antd';
import { getBusinessUserList } from 'api/business';
import MyButton from 'components/basic/button';
import { MySideOption } from 'components/business/aside';
import MyPage from 'components/business/page';
import { MyRadioCardssOption } from 'components/business/radio-cards';
import { MyTabsOption } from 'components/business/tabs';
import { FC } from 'react';

const { Item: SearchItem } = MyPage.MySearch;
const { Column, ColumnGroup } = MyPage.MyTable;

const asideOptions: MySideOption[] = [
  {
    title: 'Tab-1',
    key: 1
  },
  {
    title: 'Tab-2',
    key: 2
  },
  {
    title: 'Tab-3',
    key: 3
  }
];

const radioCardsOptions: MyRadioCardssOption[] = [
  {
    label: 'Options-1',
    value: 1
  },
  {
    label: 'Options-2',
    value: 2
  },
  {
    label: 'Options-3',
    value: 3
  }
];

const tabsOptions: MyTabsOption[] = [
  {
    label: 'Tab-1',
    value: 1
  },
  {
    label: 'Tab-2',
    value: 2
  }
];

const BusinessWithTabsPage: FC = () => {
  return (
    <MyPage
      pageApi={getBusinessUserList}
      radioCardsData={radioCardsOptions}
      asideData={asideOptions}
      tabsData={tabsOptions}
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
      tableRender={data => (
        <>
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column<any>
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags: string[]) => (
              <>
                {tags.map(tag => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record: any) => (
              <Space size="middle">
                <MyButton type="text">Invite {record.lastName}</MyButton>
                <MyButton type="text">Delete</MyButton>
              </Space>
            )}
          />
        </>
      )}
    ></MyPage>
  );
};

export default BusinessWithTabsPage;
