import React from 'react';
import { Row, Col, Card, Icon } from 'ant';

export default class App extends React.Component {
	render() {
		return (
      <Row gutter={10}>
        <Col lg={6} sm={12}>
          <Card>
            <Icon type="eye-o" style={{color: '#6cc788'}}/>
            <span className="card-text">
              <div>浏览</div>
              <div>20000</div>
            </span>
          </Card>
        </Col>
        <Col lg={6} sm={12}>
          <Card>
            <Icon type="like-o" style={{color: '#FFA54F'}}/>
            <span className="card-text">
              <div>喜欢</div>
              <div>12000</div>
            </span>
          </Card>
        </Col>
        <Col lg={6} sm={12}>
          <Card>
            <Icon type="heart" style={{color: '#f44455'}}/>
            <span className="card-text">
              <div>收藏</div>
              <div>300</div>
            </span>
          </Card>
        </Col>
        <Col lg={6} sm={12}>
          <Card>
            <Icon type="message" style={{color: '#ccc'}}/>
            <span className="card-text">
              <div>评论</div>
              <div>4000</div>
            </span>
          </Card>
        </Col>
      </Row>
		)
	}
}
