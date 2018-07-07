import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Layout } from 'ant';
import Menu from './menu';
import { getMenu } from '@/api';
import './index.less';

@inject('size', 'tool')
@withRouter
@observer
export default class App extends React.Component {
  state = {
    menuList: [],
    openKeys: [],
    selectedKeys: []
  }
  initData = async() => {
    const res = await getMenu()
    this.setState({
      menuList: res.data
    })
  }
  menuClickHandle = (e) => {// 点击子菜单设置选中
    this.setState({
  		selectedKeys: [e.key]
    });
    this.props.history.replace(e.key);
    const { size, tool } = this.props
    size.mobile && tool.toggleCollapse(true)
  }
  onOpenChange = (v) => {// 展开父菜单设置展开
    this.setState({
      openKeys: [v.pop()],
    })
  }
  setMenuOpen = () => {// 根据路由设置默认展开项和选中项
    const { pathname } = this.props.location;
    this.setState({
      openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))],
      selectedKeys: [pathname],
    });
  }
  componentDidMount() {
    this.initData();
    this.setMenuOpen();
  }
  render() {
    const { menuList, openKeys, selectedKeys } = this.state
    const { tool, size } = this.props
    return (
      <Layout.Sider 
        className="sider" 
        trigger={null}
        collapsible={true}
        collapsed={tool.collapsed}
        breakpoint="lg"
        collapsedWidth={size.mobile ? 0 : 80}>
        <div className="logo">
          {/* <img width="40" src={require('src/style/imgs/react.svg')} alt=""/> */}
        </div>
        <Menu 
          data={menuList} 
          mode='inline'
          theme="dark"
          inlineCollapsed={tool.collapsed}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.onOpenChange}
          onClick={this.menuClickHandle}/>
      </Layout.Sider>
    )
  }
}