import React from 'react';
import { observer, inject } from 'mobx-react';
import { Layout, Icon, Affix, Badge } from 'ant';
import './index.less';
import Solution from './solution';
import Message from './message';
import Mail from './mail';
import User from './user';

@inject('tool', 'tip', 'size')
@observer
export default class App extends React.Component {
  collapse = (collapsed) => {
    const { tool } = this.props
    tool.toggleCollapse(collapsed)
  }
  render() {
    const { tool, tip } = this.props
    const affix = tool.collapsed
    return (
      <Layout.Header 
        className="header">
        {   
          affix &&
          <Affix style={{position: 'fixed', zIndex: 1, padding: '13px 0'}}>
            <Badge count={tip.count} overflowCount={99}>
              <Icon
                className="trigger"
                type={tool.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => this.collapse()}
              />
            </Badge>
          </Affix> 
        }
        <div className="dropmenu-list">
          <Mail/>
          <Solution/>
          <Message/>
          <User/>
        </div>
      </Layout.Header>
    )
  }
}