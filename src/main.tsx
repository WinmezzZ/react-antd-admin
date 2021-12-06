import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import './styles/index.less';
import store from './stores';
import { Provider } from 'react-redux';
import App from './App';
import './mock';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
