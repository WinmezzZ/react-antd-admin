import React from 'react';
import { Row, Col, Card } from 'ant';
import Base from './base';
import Disabled from './disable';
import Loading from './loading';
import Icon from './icon';

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
          <Card title="禁用">
            <Disabled/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="加载中">
            <Loading/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="带图标">
            <Icon/>
          </Card>
        </Col>
      </Row>
    )
  }
}
