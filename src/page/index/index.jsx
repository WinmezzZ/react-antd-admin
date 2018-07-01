import React from 'react';
import './index.less';
import First from './first';
import Second from './second.jsx';
import Third from './third';

export default class App extends React.Component {
	render() {
		return (
			<div className="index-page">
				<First/>
				<Second/>
				<Third/>
			</div>
		)
	}
}
