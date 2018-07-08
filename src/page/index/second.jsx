import React from 'react';
import { Row, Col, Card } from 'ant';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer }  from 'recharts';

const data = [
  { name: '00:00', yesterday: 20, today: 30 },
  { name: '01:00', yesterday: 50, today: 40 },
  { name: '02:00', yesterday: 78, today: 70 },
  { name: '03:00', yesterday: 60, today: 77 },
  { name: '04:00', yesterday: 65, today: 90 },
  { name: '05:00', yesterday: 73, today: 94 },
  { name: '06:00', yesterday: 75, today: 98 },
  { name: '07:00', yesterday: 75, today: 66 },
  { name: '08:00', yesterday: 80, today: 78 },
  { name: '09:00', yesterday: 100, today: 90 },
  { name: '10:00', yesterday: 230, today: 110 },
  { name: '11:00', yesterday: 260, today: 118 },
  { name: '12:00', yesterday: 300, today: 150 },
  { name: '13:00', yesterday: 310, today: 185 },
  { name: '14:00', yesterday: 370, today: 219 },
  { name: '15:00', yesterday: 400, today: 321 },
  { name: '16:00', yesterday: 420, today: 333 },
  { name: '17:00', yesterday: 450, today: 396 },
  { name: '18:00', yesterday: 470, today: 410 },
  { name: '19:00', yesterday: 490, today: 650 },
  { name: '20:00', yesterday: 492, today: 820 },
  { name: '21:00', yesterday: 520, today: 870 },
  { name: '22:00', yesterday: 700, today: 890 },
  { name: '23:00', yesterday: 720, today: 920 }
];
export default class App extends React.Component {
  state = {
    opacity: {
      yesterday: 1,
      today: 1,
    }
  }
  handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;
    
  	this.setState({
    	opacity: { ...opacity, [dataKey]: 0.5 },
    });
  }
  
  handleMouseLeave = (o) => {
  	const { dataKey } = o;
    const { opacity } = this.state;
    
  	this.setState({
    	opacity: { ...opacity, [dataKey]: 1 },
    });
  }
	render () {
    const { opacity } = this.state;
  	return (
      <Row gutter={10}>
        <Col>
          <Card title="昨天与今天访问量对比">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
                <Line type="monotone" name="昨天" dataKey="yesterday" strokeOpacity={opacity.yesterday} stroke="#82ca9d" />
                <Line type="monotone" name="今天" dataKey="today" strokeOpacity={opacity.today} stroke="#8884d8" activeDot={{r: 8}}/>
              </LineChart> 
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    );
  }
}