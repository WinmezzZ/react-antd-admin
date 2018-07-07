# React后台管理系统

### 在线预览地址：[https://winmee.cn](https://winmee.cn)

### 引言

一个现代化的企业级后台管理系统 

### 提示

1. 进入主页需注册登录，或者您也可以使用公用账号进行登陆 

 用户名：admin 
 
 密码：123456

2. 该项目使用了响应式布局，并支持手机端浏览器。

### 安装运行
##### 1.下载源码
```js
git clone https://github.com/WinmezzZ/react-admin
```
##### 2.进入目录
```js
cd react-admin
```
##### 3.安装npm淘宝源cnpm(npm下载比较慢)
```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
##### 4.安装依赖包
```js
cnpm install
```
##### 3.启动项目
```js
npm start
```
##### 4.打包项目
```js
npm run build
```

### 技术栈

| Library | Version | Introduce | 
| - | :-: | -: | 
| React, ReactDOM | 16.3.0 | React基本库 | 
| React-router-dom | 4.2.2 | React路由库 | 
| Axios | 3.3.3 | Http库 |
| Mobx | 5.0.3 | 全局状态管理库 |
| Ant Design | 3.3.3 | UI组件库 |
| ReCharts | 1.0.0-beta.10 | 图表库 |
| MockJS | 1.0.1-beta3 | 测试数据 |
| Less | 3.0.4 | CSS预处理器 |

### 项目目录

```js
+-- build/                                  ---打包的文件目录
+-- config/                                 ---配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/                                 ---开发环境需要用到的静态资源
+-- script/                                 ---启动时打包时设置
+-- server/                                 ---服务端代码
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
|   --- registerServiceWorker.js            ---service worker离线缓存
+-- theme/                                  ---antd自定义主题样式
--- .gitignore                              ---git提交忽略配置
--- package.json                            ---插件目录
--- README.md                               ---项目说明
```

### 项目介绍
#### 开发时
- 网络请求
    - 目前只有登陆注册已接通后端接口，其他请求数据皆为mockjs仿造
    - 对axios进行了封装，可全局拦截请求和响应，设置额外参数，设置header,cookie信息等
    - 集中管理api方法，通过参数设置请求地址,请求方式，请求参数，是否上传文件等
    - 使用webpack-dev-server的proxy代理进行跨域，配置在package.json的proxy参数中
- 全局状态
    - 屏幕尺寸，设备类型(项目首次加载设置，监听屏幕宽度变化设置)
    - 菜单展开收起状态(点击子菜单或遮罩层收起，点击顶部折叠图标展开)
    - 聊天未接收消息数量(接收到服务端socket消息设置)
- 路由
    - 路由地址配置在接口返回信息中，menu组件请求到菜单信息，将route参数作为key，点击子菜单时跳转到对应的key(route)
    - 主路由在App.jsx中，子路由在route/index.jsx中(react路由4.0特性需分开配置)
- antd
    - 该网站使用antd作为ui组件库
    - 官方推荐的babel-import-plugin方法可以实现按需加载，但配合异步路由和抽取commonjs可能会引发打包时单组件体积巨大的问题，目前实现方法为将所需组件全部引入到本地component组件中，其他组件内部从本地component中引入而不是antd
    - 自定义主题在根目录theme文件中，配置文件在webpack.config.js的less模块中，可使用全局搜索查找
- 自定义组件
    - 复用组件都被封装在component目录中
    - 不复用组件如header，sider，breadcrumb等
    - 响应式组件，手机端和网页端样式差异很大需设计两套对应样式
- 布局
    - layout容器灵活布局，无需设置太多的宽高
    - 整个网站采用响应式布局，同时兼容到移动端
    - 该项目以网页端为开发核心，适配手机端只是锦上添花，可能无法兼容到所有机型，如遇问题，请联系作者
- socket(待实现，桥接已完成)

#### 打包时
- 使用了react-loadable插件启用异步组件，实现模块按需加载 
- 使用webpack.commonChunksPlugin插件进行公共代码抽离 
- 前后端同时配合采用gzip进行压缩 

