import React from 'react';
import { Row, Col, Card } from 'ant';
import Base from './base';
import Tag from './tag';
import Icon from './icon';
import Autosize from './autosize';
import Group from './group';

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
          <Card title="前置/后置标签">
            <Tag/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="搜索框">
            <Icon/>
          </Card>
          <Card title="搜索框">
            <Autosize/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="组合输入框">
            <Group/>
          </Card>
        </Col>
      </Row>
    )
  }
}
