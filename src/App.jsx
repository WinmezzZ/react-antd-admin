import React from 'react';
import { HashRouter , Switch, Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

// 引入异步组件，用于JS分包
// import Bundle from '@/component/asyncComponent';
// const Login = Bundle(() => import(/* webpackChunkName: "login" */ './page/login'));
// const Register = Bundle(() => import(/* webpackChunkName: "register" */ './page/register'));
// const Admin = Bundle(() => import(/* webpackChunkName: "admin" */  './page/admin'));

import Bundle from '@/component/loadable';
const Login = Bundle(() => import(/* webpackChunkName: "login" */ './page/login'));
const Register = Bundle(() => import(/* webpackChunkName: "register" */ './page/register'));
const Admin = Bundle(() => import(/* webpackChunkName: "admin" */  './page/admin'));

@inject('size', 'tool')
@observer
export default class App extends React.Component {
  // 获取设备类型及屏幕宽度并函数
  resize = () => {
    const { size, tool } = this.props;
    size.resize({
      mobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
      width: document.body.clientWidth
    })
    // 设置store中菜单默认展开状态
    tool.toggleCollapse(size.mobile);
  }
  componentDidMount() {
    // 初始化设resize函数
    this.resize();
    // 监听resize
    window.onresize = () => {
      this.resize();
    }
  }
  render() {
    return ( 
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/admin" component={Admin}/>
          <Route exact path="/" render={() => <Redirect to="/login" push />} />
        </Switch>
      </HashRouter>
    )
  }
}