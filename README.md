# React后台管理系统

### 在线预览地址：[http://winmee.cn](http://winmee.cn)

### 引言

一个现代化的企业级后台管理系统 

### 提示

1. 进入主页需注册登录，或者您也可以使用公用账号进行登陆 

 用户名：admin 
 
 密码：123456

2. 该项目使用了响应式布局，并支持手机端浏览器。

### 技术栈

| Library | Version | Introduce | 
| - | :-: | -: | 
| React, ReactDOM | 16.3 | React基本库 | 
| React-router-dom | 4.2.2 | React路由库 | 
| Axios | 3.3.3 | Http库 |
| Mobx | 5.0.3 | 全局状态管理库 |
| Ant Design | 3.3.3 | UI组件库 |
| ReCharts | 1.0.0-beta.10 | 图表库 |
| MockJS | 1.0.1-beta3 | 测试数据 |
| less | 3.0.4 | CSS预处理器 |

### 代码目录

```js
+-- build/                                  ---打包的文件目录
+-- config/                                 ---npm run eject 后的配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/                                 ---开发环境需要用到的静态资源
+-- src/                                    ---核心代码目录
|   +-- api                                 ---axios封装，请求拦截，请求接口集中管理
|   +-- component                           ---自定义公用组件
|   +-- mock                                ---测试数据接口
|   +-- page                                ---页面
|   +-- route                               ---子路由
|   +-- store                               ---全局数据管理
|   +-- style                               ---公共样式 
|   +-- util                                ---辅助函数
|   --- App.js                              ---主路由
|   --- index.js                            ---项目入口文件
|   +-- registerServiceWorker.js            ---service worker离线缓存
--- theme                                   ---antd自定义主题样式
--- .gitignore                              ---git提交忽略配置
--- package.json                            ---插件目录
--- README.md                               ---项目说明书
```