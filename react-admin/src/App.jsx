import React from 'react';
import { BrowserRouter , Switch, Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import Bundle from '@/component/asyncComponent';
const Login = Bundle(() => import(/* webpackChunkName: "login" */ './page/login')); 
const Admin = Bundle(() => import(/* webpackChunkName: "admin" */  './page/admin'));

@inject('size', 'tool')
@observer
export default class App extends React.Component {
  resize = () => {
    const { size, tool } = this.props;
    size.resize({
      mobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
      width: document.body.clientWidth
    })
    tool.toggleCollapse(size.mobile);
  }
  componentDidMount() {
    this.resize();
    window.onresize = () => {
      this.resize();
    }
  }
  render() {
    return ( 
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" push />} />     
          <Route path="/login" component={Login} />   
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}