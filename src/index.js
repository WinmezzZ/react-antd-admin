import React from 'react';
import ReactDOM from 'react-dom';

// store
import { Provider } from 'mobx-react';
import store from './store';

// antd中文
import 'antd/dist/antd.less';
import { LocaleProvider } from 'ant';
import { zhCN } from 'ant';
import App from './App.jsx';

// sw
import registerServiceWorker from './registerServiceWorker';

// mock数据
import './mock';

// 全局样式
import './style/index.less';

// 取消移动端300毫秒点击延迟插件
import fastclick from 'fastclick'
fastclick.attach(document.body)

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider { ...store }>
      <App/>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
)

// 开发环境热更新
if (module.hot) {  
  module.hot.accept()  
}  
registerServiceWorker();

