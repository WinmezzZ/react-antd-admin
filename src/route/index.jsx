import React from 'react'
import { 
  Redirect, 
  Switch, 
  Route 
} from 'react-router-dom'

import Bundle from '@/components/asyncComponent'
const Index = Bundle(() => import(/* webpackChunkName: "index" */ '../pages/index')); 
const Map = Bundle(() => import(/* webpackChunkName: "map" */ '../pages/monitoring/map')); 
const Error = Bundle(() => import(/* webpackChunkName: "error" */ '../pages/monitoring/error')); 
const Run = Bundle(() => import(/* webpackChunkName: "run" */ '../pages/monitoring/run')); 
const Cost = Bundle(() => import(/* webpackChunkName: "cost" */ '../pages/expense/cost')); 
const Repository = Bundle(() => import(/* webpackChunkName: "repository" */ '../pages/service/repository')); 
const Faq = Bundle(() => import(/* webpackChunkName: "faq" */ '../pages/service/faq')); 
const Role = Bundle(() => import(/* webpackChunkName: "role" */ '../pages/manage/role')); 
const Person = Bundle(() => import(/* webpackChunkName: "person" */ '../pages/manage/person')); 
const Area = Bundle(() => import(/* webpackChunkName: "area" */ '../pages/manage/area')); 
const Branch = Bundle(() => import(/* webpackChunkName: "branch" */ '../pages/manage/branch')); 
const Station = Bundle(() => import(/* webpackChunkName: "station" */ '../pages/manage/station')); 
const Device = Bundle(() => import(/* webpackChunkName: "device" */ '../pages/manage/device')); 
const FaultType = Bundle(() => import(/* webpackChunkName: "faultType" */ '../pages/manage/faultType')); 
const Set = Bundle(() => import(/* webpackChunkName: "set" */ '../pages/manage/set')); 
const Water = Bundle(() => import(/* webpackChunkName: "water" */ '../pages/manage/water')); 
const Threshold = Bundle(() => import(/* webpackChunkName: "threshold" */ '../pages/manage/threshold')); 

export default class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/app/index" component={Index}/>
		    <Route exact path="/app/monitoring/map" component={Map}/>
		    <Route exact path="/app/monitoring/error" component={Error} data={{name: '站点信息'}}/>
		    <Route exact path="/app/monitoring/run" component={Run}/>
		    <Route exact path="/app/monitoring/videoWatch" render={()=><h1>视频监控</h1>}/>
		    {/* <Route exact path="/app/monitoring/statistics" component={Statistics}/> */}
		    <Route exact path="/app/monitoring/instantWatch" render={()=><h1>实时监测</h1>}/>
				<Route exact path="/app/expense/cost" component={Cost}/>
				<Route path="/app/service/faqs" component={Faq}/>
				<Route path="/app/service/respository" component={Repository}/>
				<Route exact path="/app/manage/role" component={Role}/>
				<Route exact path="/app/manage/person" component={Person}/>
				<Route exact path="/app/manage/area" component={Area}/>
				<Route exact path="/app/manage/branch" component={Branch}/>
				<Route exact path="/app/manage/station" component={Station}/>
				<Route exact path="/app/manage/device" component={Device}/>
				<Route exact path="/app/manage/faultType" component={FaultType}/>
				<Route exact path="/app/manage/set" component={Set}/>
				<Route exact path="/app/manage/water" component={Water}/>
				<Route path="/app/manage/threshold" component={Threshold}/>
		    <Redirect from="/app" to="/app/index"/>
		  </Switch>
		)
	}
}