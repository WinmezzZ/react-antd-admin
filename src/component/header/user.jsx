import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Dropdown, Menu, Icon, Modal } from 'ant';
import { setStore } from '@/utils';

@inject('size')
@withRouter
@observer
export default class App extends React.Component {
  menuClick = ({ key }) => {
    switch(key) {
      case '3':
        Modal.confirm({
          title: '提示',
          content: '您确定要退出到登录页吗？',
          onOk: () => {
            setStore('isLogin', false);
            this.props.history.replace('/login');
          }
        })
        return
      default :
      return
    }
  }
  render() {
    const { mobile } = this.props.size;
    return (
      <Dropdown 
        trigger={[mobile ? 'click' : 'hover']}
        overlay={
          <Menu onClick={this.menuClick}>
            <Menu.Item key="1">个人信息</Menu.Item>
            <Menu.Item key="2">修改密码</Menu.Item>
            <Menu.Item key="3">退出登录</Menu.Item>
          </Menu>
        }>
      <span><Icon type="user" style={{fontSize: 16}}/></span>
    </Dropdown>
    )
  }
}