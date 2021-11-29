import { Button, Result } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，你要访问的页面不存在"
      extra={
        <Button type="primary">
          <Link to="/" replace>
            返回首页
          </Link>
        </Button>
      }
    />
  );
};

export default NotFoundPage;
