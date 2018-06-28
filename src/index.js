import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import store from './store';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import './mock';
import './style/index.less';
import 'antd/dist/antd.less';

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


if (module.hot) {  
  module.hot.accept()  
}  
registerServiceWorker();

