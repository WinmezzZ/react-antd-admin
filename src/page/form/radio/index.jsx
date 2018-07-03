import React from 'react';
import { Row, Col, Card } from 'ant';
import Base from './base';
import Size from './size';
// import Group from './group';
import Style from './style';

export default class App extends React.Component {
  render() {
    return (
      <Row gutter={10}>
        <Col md={12}>
          <Card title="基本用法">
            <Base/>
          </Card>
        </Col>
        {/* <Col md={12}>
          <Card title="单选组合">
            <Group/>
          </Card>
        </Col> */}
        <Col md={12}>
          <Card title="按钮样式">
            <Style/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="三种大小">
            <Size/>
          </Card>
        </Col>
        
      </Row>
    )
  }
}
