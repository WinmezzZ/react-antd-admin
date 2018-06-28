import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './index.scss'
import List from '@/pages/service/faq/list';
import Detail from '@/pages/service/faq/detail';

export default class Index extends Component {
  render() {
    return (
      <div className="service-faq">
        <Route exact path="/app/service/faqs" component={List}/>
				<Route exact path="/app/service/faqs/detail/:faqId" component={Detail}/>
      </div>
    )
  }
}