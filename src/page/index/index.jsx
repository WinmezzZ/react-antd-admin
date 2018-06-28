import React from 'react';
import { Row, Col, Card, Icon } from 'antd';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Row gutter={10}>
					<Col lg={6} sm={12}>
						<Card>
							<Icon type="eye-o" style={{color: 'green', fontSize: 16}}/>浏览
						</Card>
					</Col>
					<Col lg={6} sm={12}>
						<Card>
							<Icon type="like-o" style={{color: 'orange', fontSize: 16}}/>喜欢
						</Card>
					</Col>
					<Col lg={6} sm={12}>
						<Card>
							<Icon type="heart" style={{color: 'red', fontSize: 16}}/>收藏
						</Card>
					</Col>
					<Col lg={6} sm={12}>
						<Card>
							<Icon type="message" style={{color: 'grey', fontSize: 16}}/>评论
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}
