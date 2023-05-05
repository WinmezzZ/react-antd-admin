import type { FC } from 'react';

import { Button } from 'antd';
import { useRouteError } from 'react-router-dom';

const RootErrorBoundary: FC = () => {
  const error = useRouteError() as Error;

  return (
    <div className="flex flex-col items-center">
      <h2>糟糕，页面加载出错了！</h2>
      <h4>{error.message}</h4>
      <pre className="whitespace-pre text-red-6 font-mono">{error.stack}</pre>
      <Button type="primary" onClick={() => window.location.reload()}>
        点击重新加载
      </Button>
    </div>
  );
};

export default RootErrorBoundary;
