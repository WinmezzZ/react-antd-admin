import './styles/index.less';
// import './mock';
import 'uno.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './stores';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
