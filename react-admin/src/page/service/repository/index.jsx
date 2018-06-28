import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import File from '@/pages/service/repository/file';
import Upload from '@/pages/service/repository/upload';
import Play from '@/pages/service/repository/play';

export default class Index extends Component {
  render() {
    return (
      <div>
        <Route exact path="/app/service/respository" component={File}/>
        <Route exact path="/app/service/respository/upload/:type" component={Upload}/>
				<Route exact path="/app/service/respository/play" component={Play}/>
      </div>
    )
  }
}