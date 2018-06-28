import React from 'react'
import { Breadcrumb, Layout } from 'antd'
import './index.scss'

export default class App extends React.Component {
  render() {
    const { first, second } = this.props
    return (
      <Layout.Header className="flex_ca breadcrumb-container" {...this.props}>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item className="first">{first}</Breadcrumb.Item>
          <Breadcrumb.Item className="last">{second}</Breadcrumb.Item>
        </Breadcrumb>
        {this.props.children}
      </Layout.Header>
    )
  }
}