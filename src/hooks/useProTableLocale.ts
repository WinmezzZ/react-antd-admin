import { Language } from 'interface';

const en_US = {
  tableFrom: {
    search: 'Query',
    reset: 'Reset',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select'
  },
  alert: {
    clear: 'Clear'
  },
  tableToolBar: {
    leftPin: 'Pin to left',
    rightPin: 'Pin to right',
    noPin: 'Unpinned',
    leftFixedTitle: 'Fixed the left',
    rightFixedTitle: 'Fixed the right',
    noFixedTitle: 'Not Fixed',
    reset: 'Reset',
    columnDisplay: 'Column Display',
    columnSetting: 'Settings',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen',
    reload: 'Refresh',
    density: 'Density',
    densityLarger: 'Default',
    densityMiddle: 'Middle',
    densitySmall: 'Compact'
  }
};

const zh_CN = {
  tableFrom: {
    search: '查询',
    reset: '重置',
    collapsed: '展开',
    expand: '收起',
    inputPlaceholder: '请输入',
    selectPlaceholder: '请选择'
  },
  alert: {
    clear: '清空'
  },
  tableToolBar: {
    leftPin: '固定到左边',
    rightPin: '固定到右边',
    noPin: '取消固定',
    leftFixedTitle: '固定在左侧',
    rightFixedTitle: '固定在右侧',
    noFixedTitle: '不固定',
    reset: '重置',
    columnDisplay: '列展示',
    columnSetting: '列设置',
    fullScreen: '全屏',
    exitFullScreen: '退出全屏',
    reload: '刷新',
    density: '密度',
    densityLarger: '正常',
    densityMiddle: '中等',
    densitySmall: '紧凑'
  }
};

export default function useProTableLocale(lang: Language) {
  if (lang === 'zh_CN') return zh_CN;
  if (lang === 'en_US') return en_US;
  return zh_CN;
}
