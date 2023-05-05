import type { ReactNode } from 'react';

import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ServerErrorPageProps {
  message?: ReactNode;
}

const ServerErrorPage: React.FC<ServerErrorPageProps> = props => {
  const { message } = props;
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="500"
      subTitle={message || '服务器异常'}
      extra={
        <Button onClick={() => navigate(0)} type="primary">
          刷新
        </Button>
      }
    />
  );
};

export default ServerErrorPage;
