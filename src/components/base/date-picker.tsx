import React from 'react';
import { DatePicker } from 'antd';

class MyDatePicker extends React.Component {
  render() {
    return <DatePicker {...this.props} />;
  }
}

Object.assign(MyDatePicker, DatePicker);

export default MyDatePicker as typeof DatePicker;
