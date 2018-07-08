import React from 'react';
import { Col, Row, Card } from 'ant';
import Badge from './badge';
import Tooltip from './tooltip';
import Alert from './alert';
import Modal from './modal';
import Message from './message';
import Notification from './notification';

export default class App extends React.Component {
  render() {
    return (
      <Row gutter={10}>
        <Col md={12}>
          <Card title="徽章">
            <Badge/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="文字提示">
            <Tooltip/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="alert">
            <Alert/>
          </Card>
          <Card title="提醒通知">
            <Notification/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="模态框">
            <Modal/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="全局提示">
            <Message/>
          </Card>
        </Col>
      </Row>
    )
  }
}
