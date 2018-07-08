import React from 'react';
import { Row, Col, Card } from 'ant';
import Register from './register';
import Add from './add';

export default class App extends React.Component {
  render() {
    return (
      <Row gutter={10}>
        <Col md={12}>
          <Card title="注册表单">
            <Register/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="新增项表单">
            <Add/>
          </Card>
        </Col>
      </Row>
    )
  }
}
