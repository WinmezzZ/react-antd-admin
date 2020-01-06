import Mock from 'mockjs'
import mockMenuList from './menu'
import { Response } from '../api/request'

Mock.setup({
  timeout: 100
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
