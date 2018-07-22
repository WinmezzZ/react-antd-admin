import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { Modal } from 'ant';

@inject('size')
@observer
export default class App extends Component {
  render() {
    const { mobile } = this.props.size
    return (
      <Modal 
        className="custom-modal"
        width={this.props.width}
        maskClosable={false}
        destroyOnClose
        bodyStyle={{ maxHeight: !mobile && 600, overflowY: !mobile && 'auto'}}
        {...this.props}>
        {this.props.children}
        {
          mobile ? <style>{`
            .ant-modal {
              margin: 0;
              padding: 0;
              top: 0;
              width: 100%!important;
            }
            .ant-modal div {
              border-radius: 0!important;
              box-shadow: none!important;
            }
            .ant-modal-mask {
              background-color: #fff;
            }
          `}</style>
          : <style>{`
            .ant-modal-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}</style>
        }
      </Modal>
    )
  }
}