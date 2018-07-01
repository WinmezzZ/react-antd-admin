import React from 'react';
import { Row, Col, Card } from 'antd';
import Base from './base';
import Range from './range';
import Datetime from './datetime';
import Time from './time';

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
          <Card title="限制选择范围">
            <Range/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="年月日时分秒">
            <Datetime/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="时间选择器">
            <Time/>
          </Card>
        </Col>
      </Row>
    )
  }
}
