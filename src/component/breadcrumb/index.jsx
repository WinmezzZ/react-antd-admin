import React from 'react'
import { Breadcrumb, Icon } from 'ant'

export default class App extends React.Component {
  render() {
    return (
      <Breadcrumb style={{margin: '12px 0'}}>
        <Breadcrumb.Item href="">
          <Icon type="home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <span>首页</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}