import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  return (
    <Result
      status="403"
      title="401"
      subTitle="抱歉，你无权访问此页面."
      extra={
        <Link to="/">
          <Button type="primary">返回首页</Button>
        </Link>
      }
    />
  );
};

export default UnauthorizedPage;
