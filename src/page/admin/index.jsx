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
    const overlay = size.mobile && !tool.collapsed;
    return (
      <Layout className="layout-top" style={{width: overlay && 'calc( 100vw + 200px )'}}>
        <Sider/>
        <Layout className="layout-right-main">
            <Header/>
            <Layout.Content style={{ margin: '0 16px' }}>
                <div style={{height: 1000}}>
                  <h1>admin</h1>
                </div>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>
              React-Admin ©2018 Created by winme0308@gmail.com
            </Layout.Footer>
            { overlay && <div className="overlay" onClick={() => tool.toggleCollapse(true)}/> }
        </Layout>
    </Layout>
    )
  }
}