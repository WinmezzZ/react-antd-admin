import React from 'react';
import { Switch } from 'antd';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch loading defaultChecked />
        <Switch size="small" loading />
      </div>
    );
  }
}