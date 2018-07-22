import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from'recharts';
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class App extends React.Component {
  render () {
  	return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart onMouseEnter={this.onPieEnter}>
        <Pie
          data={data} 
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
      </ResponsiveContainer>
    );
  }
}
