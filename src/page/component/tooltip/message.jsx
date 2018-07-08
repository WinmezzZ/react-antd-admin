import React from 'react';
import { message, Button } from 'ant';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          基本提示： 
          <Button onClick={success}>Success</Button>
          <Button onClick={error}>Error</Button>
          <Button onClick={warning}>Warning</Button>
        </div>
        <br/>
        <div>
          加载中： 
          <Button onClick={success1}>Loading</Button>
        </div>
        <br/>
        <div>
          Promise接口： 
          <Button onClick={success2}>序列消息</Button>
        </div>
      </div>
    )
  }
}

const success = () => {
  message.success('This is a message of success');
};

const error = () => {
  message.error('This is a message of error');
};

const warning = () => {
  message.warning('This is message of warning');
};

const success1 = () => {
  const hide = message.loading('加载中...', 0);
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500);
};

const success2 = () => {
  message.loading('Action in progress..', 2.5)
    .then(() => message.success('Loading finished', 2.5))
    .then(() => message.info('Loading finished is finished', 2.5));
};