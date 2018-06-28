import React from 'react';
import { Progress } from 'antd';
import Dropdown from '@/component/dropdown'

export default class App extends React.Component {
  render() {
    return (
      <Dropdown 
        icon="solution"
        title="消息列表"
        linkName="查看全部任务进度"
        linkUrl="/admin">
        <div>
          <h2>工作进度</h2>
          <span>任务1 (进行中)</span>
          <Progress percent={30} />
          <span>任务2 (进行中)</span>
          <Progress percent={50} status="active" />
          <span>任务3 (已放弃，需汇报)</span>
          <Progress percent={70} status="exception" />
          <span>任务4 (已完成)</span>
          <Progress percent={100} />
          <style>{`
            
          `}</style>
        </div>
      </Dropdown>
    )
  }
}