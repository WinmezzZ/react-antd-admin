import React from 'react'
import { 
  Redirect, 
  Switch, 
  Route 
} from 'react-router-dom'

import Bundle from '@/component/asyncComponent'
const Index = Bundle(() => import(/* webpackChunkName: "index" */ '@/page/index')); 

export default class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/admin/index" component={Index}/>
		    <Redirect from="/admin" to="/admin/index"/>
		  </Switch>
		)
	}
}