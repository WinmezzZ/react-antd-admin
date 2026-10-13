import './styles/index.less';
import './mock';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './stores';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
