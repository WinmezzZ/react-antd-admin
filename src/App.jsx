import React from 'react';
import { HashRouter , Switch, Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

// 异步引入组件
import Bundle from '@/component/loadable';
const Login = Bundle(() => import(/* webpackChunkName: "login" */ './page/login'));
const Register = Bundle(() => import(/* webpackChunkName: "register" */ './page/register'));
const Admin = Bundle(() => import(/* webpackChunkName: "admin" */  './page/admin'));
const NotFound = Bundle(() => import(/* webpackChunkName: "notFound" */  './page/notFound'));

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
    // 初始化store的size
    this.resize();
    // 监听size
    window.onresize = () => {
      this.resize();
    }
  }
  render() {
    return ( 
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login}/>  
          <Route exact path="/register" component={Register}/>
          <Route path="/admin" component={Admin}/>
          <Route exact path="/" render={() => <Redirect to="/login" replace/>} />
          <Route component={NotFound}/>
          {/* exact 属性作用为路由必须完全匹配,避免重复渲染，父路由下若有子路由必须去除exact属性，否则子路由无法展示 */}
        </Switch>
      </HashRouter>
    )
  }
}