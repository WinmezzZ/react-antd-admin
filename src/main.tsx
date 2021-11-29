import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';

import App from './App';
import store from './store';

import './style/index.less';

ReactDOM.render(
  // <React.StrictMode>
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  // </React.StrictMode>
  document.getElementById('root'),
);
