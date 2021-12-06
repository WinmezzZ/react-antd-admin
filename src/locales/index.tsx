import { FC } from 'react';
import en_US from './en-US';
import zh_CN from './zh-CN';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';

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
