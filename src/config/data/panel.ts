export const panelData = [
  {
    PanelCode: 'nodemgr',
    PanelName: '节点管理',
    PanelVersion: '',
    PanelLastestVersion: '',
    PanelIsUpgradable: 'N',
    PanelUIVersion: '2018122901',
    SoftwareId: 12,
    ShowInMenu: 'Y',
    ShowIndex: 1,
    Licenses: [
      {
        ProductCode: 'ccenter-free',
        ProductName: '控制中心免费版',
        ProductType: 'package',
      },
    ],
    Menus: [
      {
        name: '节点列表',
        url: 'list',
        code: 'list',
      },
      {
        name: '分组管理',
        url: 'group',
        code: 'group',
      },
      {
        name: '使用手册',
        url: 'help',
        code: 'help',
      },
    ],
  },
  {
    PanelCode: 'usermgr',
    PanelName: '用户管理',
    PanelVersion: '',
    PanelLastestVersion: '',
    PanelIsUpgradable: 'N',
    PanelUIVersion: '2018030501',
    SoftwareId: 11,
    ShowInMenu: 'Y',
    ShowIndex: 2,
    Licenses: [
      {
        ProductCode: 'ccenter-free',
        ProductName: '控制中心免费版',
        ProductType: 'package',
      },
    ],
    Menus: [
      {
        name: '用户列表',
        url: 'list',
        code: 'list',
      },
      {
        name: '分组管理',
        url: 'group',
        code: 'group',
      },
      {
        name: '登录日志',
        url: 'log',
        code: 'log',
      },
    ],
  },
  {
    PanelCode: 'licensemgr',
    PanelName: '序列号管理',
    PanelVersion: '',
    PanelLastestVersion: '',
    PanelIsUpgradable: 'N',
    PanelUIVersion: '2018041801',
    SoftwareId: 10,
    ShowInMenu: 'Y',
    ShowIndex: 3,
    Licenses: [
      {
        ProductCode: 'ccenter-free',
        ProductName: '控制中心免费版',
        ProductType: 'package',
      },
    ],
    Menus: [
      {
        name: '受控端',
        url: 'agent',
        code: 'agent',
      },
      {
        name: '控制中心',
        url: 'ccenter',
        code: 'ccenter',
      },
    ],
  },
  {
    PanelCode: 'appmgr',
    PanelName: '软件管家',
    PanelVersion: '',
    PanelLastestVersion: '',
    PanelIsUpgradable: 'N',
    PanelUIVersion: '2018013101',
    SoftwareId: 9,
    ShowInMenu: 'Y',
    ShowIndex: 4,
    Licenses: [
      {
        ProductCode: 'ccenter-free',
        ProductName: '控制中心免费版',
        ProductType: 'package',
      },
    ],
    Menus: [
      {
        name: '所有软件',
        url: 'list-all',
        code: 'list-all',
      },
      {
        name: '已安装',
        url: 'installed',
        code: 'installed',
      },
      {
        name: '可用更新',
        url: 'update',
        code: 'update',
      },
      {
        name: '软件仓库设置',
        url: 'repo',
        code: 'repo',
      },
    ],
  },
  {
    PanelCode: 'dftransfer',
    PanelName: '文件对传',
    PanelVersion: '',
    PanelLastestVersion: '',
    PanelIsUpgradable: 'N',
    PanelUIVersion: '2017122701',
    SoftwareId: 16,
    ShowInMenu: 'Y',
    ShowIndex: 6,
    Licenses: [
      {
        ProductCode: 'ccenter-free',
        ProductName: '控制中心免费版',
        ProductType: 'package',
      },
    ],
    Menus: [
      {
        name: '文件对传',
        url: 'file',
        code: 'file',
      },
      {
        name: '参数设置',
        url: 'config',
        code: 'config',
      },
    ],
  },
];
