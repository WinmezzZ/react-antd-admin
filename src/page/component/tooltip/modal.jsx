import React from 'react';
import { Modal, Button } from 'ant';

export default class App extends React.Component {
  state = {
    visible: false
  }
  showAlert = (type) => {
    if (type ===1) { 
      Modal.confirm({
        title: '提示',
        content: '你确定要删除吗？',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }else {
      Modal.confirm({
        title: '提示',
        content: '你确定要删除吗？',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
    
  }
  render() {
    return (
      <div>
        <div>
          对话框： <Button type="primary" onClick={() => this.setState({visible: true})}>打开</Button>
          <Modal
            title="标题"
            visible={this.state.visible}
            onOk={() => this.setState({visible: false})}
            onCancel={() => this.setState({visible: false})}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
        <br/>
        <div>
          确认提示框： 
          <Button type="primary" onClick={() => this.showAlert(1)} style={{marginRight: 20}}>Confirm</Button>
          <Button onClick={() => this.showAlert(2)} type="dashed">Delete</Button>
        </div>
          <br/>
        <div>
          信息提示：
          <Button onClick={info}>Info</Button>
          <Button onClick={success}>Success</Button>
          <Button onClick={error}>Error</Button>
          <Button onClick={warning}>Warning</Button>
        </div>
      </div>
    )
  }
}

function info() {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

function success() {
  Modal.success({
    title: 'This is a success message',
    content: 'some messages...some messages...',
  });
}

function error() {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
}

function warning() {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
}

  