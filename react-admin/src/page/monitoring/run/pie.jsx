import React from 'react';
import * as Recharts from 'recharts'
const { ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
const data = [
	{name: '管理人员', value: 3}, 
  {name: '销售人员', value: 9},
  {name: '技术人员', value: 19}, 
  {name: '研发人员', value: 14},
  {name: '财务人员', value: 5},
  {name: '后勤人员', value: 8},
];
const COLORS = ['#F59022', '#AC3FEC', '#3B85DA', '#43B1D2', '#54C746', '#F4C72D'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(midAngle * RADIAN);
  const y = cy  + radius * Math.sin(midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class SimplePieChart extends React.Component {
	render () {
  	return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart onMouseEnter={this.onPieEnter}>
          <Pie
            data={data} 
            dataKey="value"
            labelLine={false}
          label={renderCustomizedLabel}
            isAnimationActive={false} outerRadius={80}
            fill="#8884d8">
            {
              data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
          <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}