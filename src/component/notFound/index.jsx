import React from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
class App extends React.Component {
  back = () => {
    this.props.history.go(-1)
  }
  index = () => {
    this.props.history.replace('/admin/index')
  }
  render() {
    return (
      <div>
        <h1>404</h1>
        <h3>您要找的页面不存在</h3>
        <a onClick={() => this.back()}>返回上一页</a>
        <a onClick={() => this.index()}>回到主页</a>
      </div>
    )
  }
}