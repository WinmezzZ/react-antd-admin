import React from 'react';
import { Row, Col, Card } from 'ant';
import Base from './base';
import Layout from './layout';
import Controlled from './controlled';
import CheckAll from './checkAll';

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
          <Card title="受控复选框">
            <Controlled/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="全选">
            <CheckAll/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="灵活布局">
            <Layout/>
          </Card>
        </Col>
      </Row>
    )
  }
}
