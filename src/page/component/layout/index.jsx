import React from 'react';
import { Row, Col, Card } from 'ant';
import Layout from './layout';
import Menu from './menu';
import Tab from './tab';
import Pagination from './pagination';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Card title="layout布局">
          <Layout/>
        </Card>
        <Row gutter={10}>
          <Col md={12}>
            <Card title="菜单">
              <Menu/>
            </Card>
          </Col>
          <Col md={12}>
            <Card title="tabs分页">
              <Tab/>
            </Card>
            <Card title="分页控件">
              <Pagination/>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
