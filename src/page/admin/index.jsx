import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Layout, BackTop } from 'ant';
import Sider from '@/component/sider';
import Header from '@/component/header';
import Breadcrumb from '@/component/breadcrumb';
import Route from '@/route';
import { data } from '@/mock/menu';
import './index.less';

@inject('tool','size')
@withRouter
@observer
export default class App extends React.Component {
  componentDidMount() {
    // 初始化页面title
    this.getTitle(this.props.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    // 切换路由时修改title
    const pathname1 = nextProps.location.pathname; // 新props
    const pathname2 = this.props.location.pathname; // 旧props
    if (pathname1.includes('admin') && (pathname1 !== pathname2)) { //admin下切换菜单
      this.getTitle(pathname1);
    }
  }
  getTitle = (pathname) => {
    const parent = data.find(item => pathname.includes(item.route)) // 记录一级菜单
    const children = parent.children && parent.children.find(item => pathname === item.route) // 记录二级菜单
    document.title = (children && children.name) || parent.name; // 将菜单名赋值给title
  }
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
                <BackTop target={() => document.getElementsByClassName('layout-right-main')[0]}/>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>
              <p>React-Admin ©2018 Created by Winme</p>
              <p>
                github:<a href="https://github.com/WinmezzZ/react-admin">文档地址</a>&nbsp;
                gmail:<a>winme0308@gmail.com</a>&nbsp;
              </p>
            </Layout.Footer>
            { overlay && <div className="overlay" onClick={() => tool.toggleCollapse(true)}/> }
        </Layout>
    </Layout>
    )
  }
}