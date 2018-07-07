import React from 'react';
import { Row, Col, Card } from 'ant';
import Base from './base';
import Avator from './avator';
import FileList from './fileList';
import Drag from './drag';

export default class App extends React.Component {
  render() {
    return (
      <Row gutter={10}>
        <Col md={12}>
          <Card title="基本用法">
            <Base/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="拖拽上传">
            <Avator/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="照片墙">
            <FileList/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="加载中">
            <Drag/>
          </Card>
        </Col>
      </Row>
    )
  }
}
