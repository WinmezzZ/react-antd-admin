import * as Mock from 'mockjs'

export const data = [
  {
    icon: 'home',
    name: '首页',
    route: '/admin/index'
  },
  {
    icon: 'calendar',
    name: '基础组件',
    route: '/admin/component',
    children: [
      {
        icon: 'form',
        name: '表单控件',
        route: '/admin/component/form'
      },
      {
        icon: 'table',
        name: '表格',
        route: '/admin/component/table'
      },
      {
        icon: 'layout',
        name: '布局组件',
        route: '/admin/component/layout'
      },
      {
        icon: 'exclamation-circle-o',
        name: '提示组件',
        route: '/admin/component/tooltip'
      }
    ]
  },
  {
    icon: 'layout',
    name: '业务应用',
    route: '/admin/business',
    children: [
      {
        name: '路由权限',
        route: '/admin/business/auth'
      },
      {
        name: '404',
        route: '/abcd'
      },
      {
        name: '数据操作',
        route: '/admin/business/operation'
      }
    ]
  },
  {
    icon: 'global',
    name: '第三方组件',
    route: '/admin/other',
    children: [
      {
        name: '图片裁剪',
        route: '/admin/other/cropper'
      },
      {
        name: '富文本编辑器',
        route: '/admin/other/editor'
      },
      {
        name: '地图',
        route: '/admin/other/map'
      },
      {
        name: '图表',
        route: '/admin/other/chart'
      }
    ]
  },
  {
    icon: 'tool',
    name: '自定义组件',
    route: '/admin/tool',
    children: [
      {
        name: '在线聊天',
        route: '/admin/tool/chat'
      }
    ]
  }
]

Mock.mock('/mock/user/menu',{
  code: 0,
  data
})