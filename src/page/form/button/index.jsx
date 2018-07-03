import React from 'react';
import { Row, Col, Card } from 'ant';
import Base from './base';
import Size from './size';
import Loading from './loading';
import Icon from './icon';
import './index.less';

export default class App extends React.Component {
  render() {
    return (
      <Row gutter={10} className="button-page">
        <Col md={12}>
          <Card title="基本用法">
            <Base/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="不同尺寸">
            <Size/>
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
