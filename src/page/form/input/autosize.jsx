import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TextArea placeholder="单行高度自适应的文本域，内容换行时高度会被撑大" autosize />
        <div style={{ margin: '24px 0' }} />
        <TextArea placeholder="高度自适应且有最小值和最大值的文本域" autosize={{ minRows: 2, maxRows: 6 }} />
      </div>
    )
  }
}