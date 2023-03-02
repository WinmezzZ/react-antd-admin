import type { FC } from 'react';
import type { MessageDescriptor } from 'react-intl';

import { FormattedMessage, useIntl } from 'react-intl';

import en_US from './en-US';
import zh_CN from './zh-CN';

export const localeConfig = {
  zh_CN: zh_CN,
  en_US: en_US,
};

type Id = keyof typeof en_US;

interface Props extends MessageDescriptor {
  id: Id;
}

export const LocaleFormatter: FC<Props> = ({ ...props }) => {
  const notChildProps = { ...props, children: undefined };

  return <FormattedMessage {...notChildProps} id={props.id} />;
};

type FormatMessageProps = (descriptor: Props) => string;

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  const formatMessage: FormatMessageProps = _formatMessage;

  return {
    ...rest,
    formatMessage,
  };
};
