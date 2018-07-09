import React from 'react';
import { Pagination } from 'ant';

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}
export default class App extends React.Component {
  render() {
    return (
      <Pagination 
        showSizeChanger 
        showQuickJumper 
        onShowSizeChange={onShowSizeChange} 
        defaultCurrent={3} 
        total={500} 
        showTotal={(total) => `共 ${total} 条`}/>
    );
  }
}