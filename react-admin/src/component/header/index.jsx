import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Icon } from 'antd'
import './index.less'

@inject('tool')
@observer
export default class App extends React.Component {
  toogleCollapse = () => {
    const { tool } = this.props
    tool.toggleCollapse()
  }
  render() {
    const { tool } = this.props
    return (
      <Layout.Header 
        className="header">
        <Icon
          className="trigger"
          type={tool.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toogleCollapse}
        />
      </Layout.Header>
    )
  }
}