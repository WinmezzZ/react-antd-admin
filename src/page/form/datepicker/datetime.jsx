import React from 'react';
import { DatePicker } from 'ant';

const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

export default class App extends React.Component {
  state = {
    loading: false,
    iconLoading: false,
  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  }

  render() {
    return (
      <div>
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择时间"
          onChange={onChange}
          onOk={onOk}
        />
        <br /> <br/>
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['开始时间', '结束时间']}
          onChange={onChange}
          onOk={onOk}
        />
      </div>
    );
  }
}