import React from 'react';
import { Card } from 'ant';
import Base from './base';
import Core from './core';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Card title="基础表格">
          <Base/>
        </Card>
        <Card title="高级表格">
          <Core/>
        </Card>
      </div>
    )
  }
}
