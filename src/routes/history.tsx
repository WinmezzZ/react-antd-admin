import { createBrowserHistory } from 'history';
import React, { type PropsWithChildren } from 'react';
import { Router } from 'react-router-dom';

export const history = createBrowserHistory();

interface HistoryRouterProps {
  history: typeof history;
}

export const HistoryRouter: React.FC<PropsWithChildren<HistoryRouterProps>> = ({ history, children }) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return React.createElement(Router, Object.assign({ children, navigator: history }, state));
};
