import React from 'react';
import { List } from 'antd';
import Dropdown from '@/component/dropdown'

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export default class App extends React.Component {
  render() {
    return (
      <Dropdown 
        icon="mail"
        title="收件箱"
        linkName="查看全部邮件"
        linkUrl="/admin">
        <div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
          <style>{`
            .ant-list-item {
              padding: 8px 0;
            }
            .ant-list-item-meta-description {
              width: 280px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          `}</style>
        </div>
      </Dropdown>
    )
  }
}