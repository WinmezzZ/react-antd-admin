import Mock from 'mockjs'
import { Response } from '../api/request'
import mockMenuList from './menu'
import mockNoticeList from './notice'

Mock.setup({
  timeout: 300
})

// 模拟真实后端接口结构
function intercepter<T>(data: T): Response<T> {
  return {
    status: true,
    message: '成功',
    result: data
  }
}

Mock.mock('/user/menu', 'get', intercepter(mockMenuList))
Mock.mock('/user/notice', 'get', intercepter(mockNoticeList))
