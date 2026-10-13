import type { MessageInstance } from 'antd/es/message/interface';

let messageApi: MessageInstance | undefined;

export const setMessageApi = (api?: MessageInstance) => {
  messageApi = api;
};

export const showErrorMessage = (content: string) => {
  messageApi?.error(content);
};
