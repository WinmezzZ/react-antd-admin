import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Index from './threshold'
import Standard from './standard'
import Breadcrumb from '@/components/breadcrumb'
import Tabs from '@/components/tabs'
import { Layout } from 'antd'

class Threshold extends Component {
  state = {
    tabsData: [
      { 
        name: '阈值管理',
        path: '/app/manage/threshold'
      },
      {
        name: '标准数据录入',
        path: '/app/manage/threshold/standard'
      }
    ]
  }
  render() {
    const { tabsData } = this.state
    return (
      <Layout>
        <Breadcrumb first="管理平台" second="阈值管理"/>
        <Layout>
          <Layout.Content>
            <Tabs data={tabsData}/>
            <Switch>
              <Route exact path="/app/manage/threshold" component={Index}/>
              <Route exact path="/app/manage/threshold/standard" component={Standard}/>
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

export default Threshold