import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.less';
import store from './stores';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './mock';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// hmr enable
if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
