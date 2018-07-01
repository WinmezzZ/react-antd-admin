import React from 'react';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';
import Sider from '@/component/sider';
import Header from '@/component/header';
import Breadcrumb from '@/component/breadcrumb';
import Route from '@/route'
import './index.less';

@inject('tool','size')
@observer
export default class App extends React.Component {
  render() {
    const { tool, size } = this.props;
    const overlay = size.mobile && !tool.collapsed; // 手机状态下且菜单展开时出现遮罩层
    return (
      <Layout className="layout-top" style={{width: overlay && 'calc( 100vw + 200px )'}}> 
        {/* 因为layout默认宽度为100%，为了在手机端菜单展开时右边内容显示正常需增加一个菜单的宽度 */}
        <Sider/>
        <Layout className="layout-right-main">
            <Header/>
            <Layout.Content style={{ margin: '0 16px' }}>
                <Breadcrumb/>
                <Route/>
            </Layout.Content>
            { overlay && <div className="overlay" onClick={() => tool.toggleCollapse(true)}/> }
        </Layout>
    </Layout>
    )
  }
}