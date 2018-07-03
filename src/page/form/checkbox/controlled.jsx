import React from 'react';
import { Checkbox, Button } from 'ant';

export default class App extends React.Component {
  state = {
    checked: true,
    disabled: false,
  }
  toggleChecked = () => {
    this.setState({ checked: !this.state.checked });
  }

  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  }
  onChange = (e) => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  }
  render() {
    const label = `${this.state.checked ? '选中' : '未选中'}-${this.state.disabled ? '禁用' : '启用'}`;
    return (
      <div>
        <p style={{ marginBottom: '20px' }}>
          <Checkbox
            checked={this.state.checked}
            disabled={this.state.disabled}
            onChange={this.onChange}
          >
            {label}
          </Checkbox>
        </p>
        <p>
          <Button
            type="primary"
            size="small"
            onClick={this.toggleChecked}
          >
            {!this.state.checked ? '选中' : '不选'}
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            type="primary"
            size="small"
            onClick={this.toggleDisable}
          >
            {!this.state.disabled ? '禁用' : '启用'}
          </Button>
        </p>
      </div>
    );
  }
}