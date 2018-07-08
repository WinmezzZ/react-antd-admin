import React from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Icon } from 'ant';
import { data } from '@/mock/menu';
import './index.less';

@withRouter
export default class App extends React.Component {
  state = {
    second: '',
    third: ''
  }
  componentWillReceiveProps(nextProps) {
    // 设置动态breadcrumb item
    const pathname1 = nextProps.location.pathname; // 新props
    const pathname2 = this.props.location.pathname; // 旧props
    if (pathname1.includes('admin') && (pathname1 !== pathname2)) { //admin下切换菜单
      const parent = data.find(item => pathname1.includes(item.route)) // 记录一级菜单
      const children = parent.children && parent.children.find(item => pathname1 === item.route) // 记录二级菜单
      const index = parent.route === '/admin/index'; // 当前为首页
      this.setState({ // 将菜单名赋值
        second: index ? undefined : parent.name,
        third: index ? undefined : children.name
      })
    }
  }
  render() {
    const { second, third } = this.state
    return (
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Icon type="home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>首页</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>{second}</span>
        </Breadcrumb.Item>
        {
          third && <Breadcrumb.Item>
            <span>{third}</span>
          </Breadcrumb.Item>
        }
      </Breadcrumb>
    )
  }
}