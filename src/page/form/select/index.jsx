import React from 'react';
import { Row, Col, Card } from 'ant';
import Base from './base';
import Search from './search';
import Multipart from './multipart';
import Menu from './menu';
import Group from './group';
import Cascader from './cascader';
import Tree from './tree';

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
          <Card title="可搜索">
            <Search/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="可多选的">
            <Multipart/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="分组">
            <Menu/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="联动选择器">
            <Group/>
            <br/>
            <Cascader/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="树形选择器">
            <Tree/>
          </Card>
        </Col>
      </Row>
    )
  }
}
