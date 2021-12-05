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
        title: '节点列表',
        path: '/nodemgr',
        code: 'list',
      },
      {
        title: '分组管理',
        path: '/nodemgr/group',
        code: 'group',
      },
      {
        title: '使用手册',
        path: '/nodemgr/help',
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
        title: '用户列表',
        path: '/usermgr',
        code: 'list',
      },
      {
        title: '分组管理',
        path: '/usermgr/group',
        code: 'group',
      },
      {
        title: '登录日志',
        path: '/usermgr/log',
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
        title: '受控端',
        path: '/licensemgr',
        code: 'agent',
      },
      {
        title: '控制中心',
        path: '/licensemgr/ccenter',
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
        title: '所有软件',
        path: '/appmgr',
        code: 'list-all',
      },
      {
        title: '已安装',
        path: '/appmgr/installed',
        code: 'installed',
      },
      {
        title: '可用更新',
        path: '/appmgr/update',
        code: 'update',
      },
      {
        title: '软件仓库设置',
        path: '/appmgr/repo',
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
        title: '文件对传',
        path: '/dftransfer',
        code: 'file',
      },
      {
        title: '参数设置',
        path: '/dftransfer/config',
        code: 'config',
      },
    ],
  },
  {
    PanelCode: 'notification',
    PanelName: '通知中心',
    PanelVersion: '',
    PanelLastestVersion: '',
    PanelIsUpgradable: 'N',
    PanelUIVersion: '2017122701',
    SoftwareId: 14,
    ShowInMenu: 'N',
    Menus: [
      {
        title: '系统通知',
        path: '/notification',
        code: 'notification',
      },
      {
        title: '官网公告',
        path: '/notification/announcement',
        code: 'announcement',
      },
      {
        title: '邮件发送设置',
        path: '/notification/setting',
        code: 'setting',
      },
      {
        title: '通知回调设置',
        path: '/notification/callback',
        code: 'callback',
      },
    ],
  },
];
