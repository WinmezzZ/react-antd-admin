import React from 'react';
import { Switch, Icon } from 'ant';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
        <Switch checkedChildren="1" unCheckedChildren="0" />
        <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />
      </div>
    )
  }
}