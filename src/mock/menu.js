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
        name: '面包屑',
        route: '/admin/business/breadcrumb'
      },
      {
        name: '标签页',
        route: '/admin/business/tabs'
      }
    ]
  },
  {
    icon: 'pie-chart',
    name: '数据组件',
    route: '/admin/data',
    children: [
      {
        name: '表格',
        route: '/admin/data/table'
      },
      {
        name: '轮播图',
        route: '/admin/data/banner'
      },
      {
        name: '卡片',
        route: '/admin/data/card'
      },
      {
        name: '树',
        route: '/admin/data/tree'
      },
      {
        name: '时间轴',
        route: '/admin/data/timeline'
      },
      {
        name: '步骤条',
        route: '/admin/data/step'
      },
      {
        name: '日历',
        route: '/admin/data/calendar'
      }
    ]
  },
  {
    icon: 'exclamation-circle',
    name: '提示组件',
    route: '/admin/tip',
    children: [
      {
        name: '徽章',
        route: '/admin/tip/badge'
      },
      {
        name: '文字提示',
        route: '/admin/tip/tooltip'
      },
      {
        name: '气泡',
        route: '/admin/tip/popover'
      },
      {
        name: '警告',
        route: '/admin/tip/alert'
      },
      {
        name: '对话框',
        route: '/admin/tip/modal'
      },
      {
        name: '全局提示',
        route: '/admin/tip/message'
      },
      {
        name: '通知提醒',
        route: '/admin/tip/notification'
      }
    ]
  },
  {
    icon: 'global',
    name: '第三方组件',
    route: '/admin/third',
    children: [
      {
        name: '图片裁剪',
        route: '/admin/third/cropper'
      },
      {
        name: '富文本编辑器',
        route: '/admin/third/editor'
      },
      {
        name: '地图',
        route: '/admin/third/map'
      },
      {
        name: '图表',
        route: '/admin/third/chart'
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