import React from 'react';
import { Modal, Upload, Icon, message } from 'ant';

import Cropper, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// 详情请参见 https://github.com/DominicTobias/react-image-crop

export default class App extends React.Component {
  state = {
    src: '',
    visible: false,
  }
  file = ''
  pixelCrop = {}
  onImageLoaded = (image) => {
    this.setState({
      crop: makeAspectCrop({
        x: 0,
        y: 0,
        aspect: 1 / 1,
        width: 100,
      }, image.width / image.height),
    });
  }
  handleChange = (data) => {
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
  onChange = (crop)=> {
    this.setState({crop});
 }
  onComplete = (crop, pixelCrop) => {
    this.pixelCrop = pixelCrop
  }
  cropClose = (down = false) => {
    this.setState(() => {
      const data = { visible: false }
      if (down) { 
        const { file, pixelCrop } = this;
        console.log(file, pixelCrop)
        const src = getCroppedImg(file, pixelCrop, file.name)
        data.src = src
      }
      return data
    })
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
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action=""
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
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
              src={src}
              crop={this.state.crop}
              onImageLoaded={this.onImageLoaded}
              onChange={this.onChange}
              onComplete={this.onComplete}
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

// crop
/**
 * @param {File} image - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
 * @param {String} fileName - Name of the returned file in Promise
 */
function getCroppedImg(image, pixelCrop, fileName) {
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  console.dir(ctx)

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(file => {
        file.name = fileName;
        resolve(file);
      }, 'image/jpeg');
    } catch(err) {
      reject('canvas to blob error!')
    }
  });
}

