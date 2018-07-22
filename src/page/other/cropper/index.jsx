import React, { Component } from 'react';
import { Upload, Icon, message } from 'ant';
import Modal from '@/component/modal';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default class App extends Component {
  state = {
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    visible: false
  }
  onPreview = () => {
    this.setState({visible: true})
  }
  onChange = (data) => {
    const { file } = data;
    const fd = new FileReader()
      fd.onloadend = () => {
        this.file = file
        this.setState({
          src: fd.result,
          visible: true
        })
    };
    fd.readAsDataURL(file)
  }

  cropClose = (down = false) => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    const cropper = this.cropper.getCroppedCanvas().toDataURL();
    this.setState({
      src: down ? cropper : this.state.src,
      visible: false
    });
  }

  render() {
    const { src, visible } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          listType="picture-card"
          style={{width: 300}}
          showUploadList={false}
          action=""
          beforeUpload={beforeUpload}
          onPreview={this.onPreview}
          onChange={this.onChange}
        >
          {src ? <img src={src} alt="avatar" width="100%"/> : uploadButton}
        </Upload>
        <Modal
          title="选择图片区域"
          maskClosable={false}
          visible={visible}
          onOk={() => this.cropClose(true)}
          onCancel={() => this.cropClose()}>
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={1 / 1}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
          />
        </Modal>
      </div>
    );
  }
}

// validate
function beforeUpload(file) {
  const isIMG = file.type.includes('image');
  if (!isIMG) {
    message.error('只能上传图片文件！');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不得超过2M！');
  }
  // return isJPG && isLt2M; return false取消默认上传
  return false
}