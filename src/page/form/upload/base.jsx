
import React from 'react';
import { Upload, message, Button, Icon } from 'antd';

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功！`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败！`);
    }
  },
};

export default class App extends React.Component {
  render() {
    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    )
  }
}