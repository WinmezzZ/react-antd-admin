import React from 'react';
import { Select } from 'ant';

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class App extends React.Component {
  render() {
    return (
      <Select
        mode="multiple"
        style={{ width: '100%', height: 30 }}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
      >
        {children}
      </Select>
    );
  }
}