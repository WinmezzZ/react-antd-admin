import React from 'react';
import { Switch } from 'ant';

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