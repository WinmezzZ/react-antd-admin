import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import { Modal } from 'ant';

class CustomModal extends Component {
  render() {
    const { isMobile } = this.props.size
    return (
      <Modal 
        className="custom-modal"
        width={this.props.width}
        maskClosable={false}
        destroyOnClose
        bodyStyle={{ maxHeight: !isMobile && 600, overflowY: !isMobile && 'auto'}}
        {...this.props}>
        {this.props.children}
        {
          isMobile ? <style>{`
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

const mapStateToProps = state => state

export default connect(mapStateToProps)(CustomModal)