import React from 'react'
import { Route } from 'react-router-dom';
// import AuthRouter from '@/component/authRouter';
import Bundle from '@/component/loadable';

// import Bundle from '@/component/asyncComponent';  异步路由加载
const Index = Bundle(() => import(/* webpackChunkName: "index" */ '@/page/index'));
const Form = Bundle(() => import(/* webpackChunkName: "form" */ '@/page/component/form'));
const Table = Bundle(() => import(/* webpackChunkName: "table" */ '@/page/component/table'));
const Layout = Bundle(() => import(/* webpackChunkName: "layout" */ '@/page/component/layout'));
const Tooltip = Bundle(() => import(/* webpackChunkName: "tooltip" */ '@/page/component/tooltip'));
const Auth = Bundle(() => import(/* webpackChunkName: "auth" */ '@/page/business/auth'));

export default class Routes extends React.Component {
	render() {
		return (
			<div>
				<Route exact path="/admin/index" component={Index}/>
				<Route exact path="/admin/component/form" component={Form}/>
				<Route exact path="/admin/component/table" component={Table}/>
				<Route exact path="/admin/component/layout" component={Layout}/>
				<Route exact path="/admin/component/tooltip" component={Tooltip}/>
				<Route exact path="/admin/business/auth" component={Auth}/>
				{/* react 4.0路由特性: 子路由地址前缀必须带上父路由地址 */}
		  </div>
		)
	}
}