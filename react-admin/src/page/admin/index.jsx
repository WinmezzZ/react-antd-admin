import React from 'react';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import Sider from '@/component/sider';
import Header from '@/component/header';
import './index.less';

@inject('tool','size')
@observer
export default class App extends React.Component {
  render() {
    const { tool, size } = this.props;
    return (
      <Layout className="layout-top">
        <Sider/>
        <Layout className="layout-right-main">
            <Header/>
            <Layout.Content style={{ margin: '0 16px' }}>
                <div>
                  <h1>admin</h1>
                </div>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>
              React-Admin ©2018 Created by winme0308@gmail.com
            </Layout.Footer>
            { size.mobile && !tool.collapsed && <div className="overlay" onClick={() => tool.toggleCollapse(true)}/> }
        </Layout>
    </Layout>
    )
  }
}