import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from '@/page/login';
import { getStore } from '@/utils';
import { Modal } from 'ant';

@withRouter
export default class App extends React.Component {
  state = {
    isLogin: getStore('isLogin'),
    visible: true
  }
  componentWillReceiveProps(prevProps) {
    // 默认打开登录遮罩层
    const newPath = prevProps.location.pathname !== this.props.location.pathname;
    newPath && this.setState({
      visible: true
    })
  }
  login = () => {
    this.setState({
      isLogin: true
    })
  }
  render() {
    const { component, ...rest } = this.props;
    const Component = component;
    return (
      <Route {...rest} render={props => (
        this.state.isLogin ? (
          <Component {...props}/>
        ) : (
          <div>
            <h3>您必须登录过后才能看到此页，请登录！</h3>
            <a onClick={() => this.setState({visible: true})}>登录</a>
            <Modal
              title="登录"
              width="400px"
              visible={this.state.visible}
              footer={null}
              onCancel={() => {this.setState({visible: false})}}
            >
              <Login onLogin={() => this.login()} bgc="#fff"/>
            </Modal>
          </div>
        )
      )}/>
    )
  }
}
