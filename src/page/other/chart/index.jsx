import React from 'react';
import { Col, Row, Card } from 'ant';
import Line from './line';
import Bar from './bar';
import Pie from './pie';
import Radar from './radar';

export default class App extends React.Component {
  render() {
    return (
      <Row gutter={10}>
        <style>{`
          .ant-card-body {
            padding: 24px 4px;
          }
        `}</style>
        <Col md={12}>
          <Card title="线形图">
            <Line/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="柱状图">
            <Bar/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="扇形图">
            <Pie/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="雷达图">
            <Radar/>
          </Card>
        </Col>
      </Row>
    )
  }
}
