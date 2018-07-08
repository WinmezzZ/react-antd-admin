import React from 'react';
import { Badge, Divider, Icon } from 'ant';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Badge count={5}>
          <span className="head-example"/>
        </Badge>
        <Divider type="vertical"/>
        <Badge count={0} showZero>
          <span className="head-example"/>
        </Badge>
        <Divider type="vertical"/>
        <Badge count={1000} overflowCount={999}>
          <span className="head-example"/>
        </Badge>

        <Divider/>

        <Badge dot>
          <Icon type="notification" />
        </Badge>
        <Divider type="vertical"/>
        <Badge dot>
          <a>更新</a>
        </Badge>

        
        <style>{`
          .head-example {
            width: 42px;
            height: 42px;
            border-radius: 4px;
            background: #eee;
            display: inline-block;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}