import { Space, Tag } from 'antd';
import { getBusinessUserList } from 'api/business';
import MyButton from 'components/basic/button';
import MyPage from 'components/business/page';
import { FC } from 'react';

const { Column, ColumnGroup } = MyPage.MyTable;

const BusinessBasicPage: FC = () => {
  return (
    <MyPage
      pageApi={getBusinessUserList}
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

export default BusinessBasicPage;
