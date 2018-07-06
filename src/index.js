import React from 'react';
import ReactDOM from 'react-dom';

// 在跟组件通过Provider中间件注入store
import { Provider } from 'mobx-react';
import store from './store';

// antd样式
import 'antd/dist/antd.less';
// antd国际化(中文)
import { LocaleProvider } from 'ant';
import { zhCN } from 'ant';
// 日期组件中文
import 'moment/locale/zh-cn';

// 引入主路由
import App from './App.jsx';

// sw
import registerServiceWorker from './registerServiceWorker';

// mock数据
import './mock';

// 全局样式
import './style/index.less';

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider { ...store }>
      <App/>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
)
  
registerServiceWorker();

// 开发环境热更新
if (module.hot) {  
  module.hot.accept()  
}

