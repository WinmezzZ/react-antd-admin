import { FC } from 'react';
import { RouteProps } from 'react-router';
import PrivateRoute from './pravateRoute';
import { useIntl } from 'react-intl';
import { ReactElement } from 'hoist-non-react-statics/node_modules/@types/react';

export interface WrapperRouteProps extends RouteProps {
  /** document title locale id */
  titleId: string;
  /** authorization？ */
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, auth, ...props }) => {
  const { formatMessage } = useIntl();

  if (titleId) {
    document.title = formatMessage({
      id: titleId,
    });
  }

  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
