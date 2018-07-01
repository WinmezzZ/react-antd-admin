import React from 'react';
import { Switch, Button } from 'antd';

export default class App extends React.Component {
  state = {
    disabled: true,
  }

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    return (
      <div>
        <Switch disabled={this.state.disabled} defaultChecked />
        <Button type="primary" onClick={this.toggle}>切换状态</Button>
      </div>
    );
  }
}
