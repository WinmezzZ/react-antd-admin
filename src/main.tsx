import { createRoot } from 'react-dom/client'
import 'antd/dist/antd.less';
import './styles/index.less';
import store from './stores';
import { Provider } from 'react-redux';
import App from './App';
import './mock';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
