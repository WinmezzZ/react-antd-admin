
import React from 'react';
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <DatePicker onChange={onChange} />
        <br /><br />
        <MonthPicker onChange={onChange} placeholder="选择月份" />
        <br /><br />
        <RangePicker onChange={onChange} />
        <br /><br />
        <WeekPicker onChange={onChange} placeholder="选择周" />
      </div>
    )
  }
}