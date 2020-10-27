import React, { FC } from 'react';
import { Spin, Alert } from 'antd';

const SuspendFallbackLoading: FC = () => {
  return (
    <Spin tip="加载中...">
      <Alert message="Alert message title" description="Further details about the context of this alert." type="info" />
    </Spin>
  );
};

export default SuspendFallbackLoading;
