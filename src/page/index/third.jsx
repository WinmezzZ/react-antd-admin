import React from 'react';
import { Row, Col, Card, List, Pagination, Calendar } from 'ant';

const list = [
  { name: '曾小贤', message: '好男人就是我，我就是好男人，曾 小 贤~' },
  { name: '孙悟空', message: '呔！猪精，哪里逃？吃俺老孙一棒！' },
  { name: '白展堂', message: '葵花点穴手！' },
  { name: '至尊宝', message: '曾经有一份真诚的爱情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。如果上天能够给我一个再来一次的机会，我会对那个女孩子说三个字：我爱你。如果非要在这份爱上加上一个期限，我希望是……一万年！' },
  { name: '白展堂', message: '葵花点穴手！' },
  { name: '刘星', message: "'我叫夏雪'，'我叫夏雨'， '我叫夏冰雹'" },
  { name: '包拯', message: "元芳，此事你怎么看？" },
];

export default class App extends React.Component {
  
	render () {
  	return (
      <Row gutter={10}>
        <Col md={12}>
          <Card title="最新留言" extra={
            <a>查看全部留言</a>
          }>
            <List
              size="small"
              bordered
              footer={
                <Pagination defaultCurrent={1} total={500} size="small" style={{textAlign: 'right'}}/>
              }
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <div className="index-message">
                    <span>{item.name}: </span>
                    <span>{ item.message}</span>
                    <span><a>回复</a></span>
                  </div>
                </List.Item>
              )}/>
          </Card>
        </Col>
        <Col md={12}>
          <Card title="我的日程" className="calendar-card">
              <Calendar fullscreen={false}/>
          </Card>
          <style>{`
            .calendar-card .ant-card-body {
              padding-top: 0;
            }
          `}</style>
        </Col>
      </Row>
    );
  }
}