import { FC } from 'react';
import { Spin, Alert } from 'antd';

interface FallbackMessageProps {
  message: string;
  description?: string;
}

const SuspendFallbackLoading: FC<FallbackMessageProps> = ({ message, description }) => {
  return (
    <Spin tip="加载中...">
      <Alert message={message} description={description} type="info" />
    </Spin>
  );
};

export default SuspendFallbackLoading;
