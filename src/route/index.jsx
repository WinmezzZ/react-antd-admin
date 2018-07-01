import React from 'react'
import { Route } from 'react-router-dom'

import Bundle from '@/component/asyncComponent';
const Index = Bundle(() => import(/* webpackChunkName: "index" */ '@/page/index'));
const Button = Bundle(() => import(/* webpackChunkName: "button" */ '@/page/form/button'));
const Checkbox = Bundle(() => import(/* webpackChunkName: "index" */ '@/page/form/checkbox'));
const Datepicker = Bundle(() => import(/* webpackChunkName: "datepicker" */ '@/page/form/datepicker'));
const Input = Bundle(() => import(/* webpackChunkName: "input" */ '@/page/form/input'));
const Radio = Bundle(() => import(/* webpackChunkName: "radio" */ '@/page/form/radio'));
const Select = Bundle(() => import(/* webpackChunkName: "select" */ '@/page/form/select'));
const Switch = Bundle(() => import(/* webpackChunkName: "switch" */ '@/page/form/switch'));
const Upload = Bundle(() => import(/* webpackChunkName: "upload" */ '@/page/form/upload'));

export default class Routes extends React.Component {
	render() {
		return (
			<div>
				<Route exact path="/admin/index" component={Index}/>
				<Route exact path="/admin/form/button" component={Button}/>
				<Route exact path="/admin/form/checkbox" component={Checkbox}/>
				<Route exact path="/admin/form/datepicker" component={Datepicker}/>
				<Route exact path="/admin/form/input" component={Input}/>
				<Route exact path="/admin/form/radio" component={Radio}/>
				<Route exact path="/admin/form/select" component={Select}/>
				<Route exact path="/admin/form/switch" component={Switch}/>
				<Route exact path="/admin/form/upload" component={Upload}/>
		  </div>
		)
	}
}