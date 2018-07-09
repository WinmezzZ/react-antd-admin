import React from 'react';
import { Tabs, Select } from 'ant';

const TabPane = Tabs.TabPane;
const Option = Select.Option;


export default class App extends React.Component {
  state = {
    tabPosition: 'top',
  }

  changeTabPosition = (tabPosition) => {
    this.setState({ tabPosition });
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          Tab 位置 &nbsp;
          <Select
            value={this.state.tabPosition}
            onChange={this.changeTabPosition}
            dropdownMatchSelectWidth={false}
          >
            <Option value="top">上</Option>
            <Option value="bottom">下</Option>
            <Option value="left">左</Option>
            <Option value="right">右</Option>
          </Select>
        </div>
        <Tabs tabPosition={this.state.tabPosition}>
          <TabPane tab="Tab 1" key="1">1111111111111111111</TabPane>
          <TabPane tab="Tab 2" key="2">222222222222</TabPane>
          <TabPane tab="Tab 3" key="3">3333333333333333</TabPane>
        </Tabs>
      </div>
    );
  }
}