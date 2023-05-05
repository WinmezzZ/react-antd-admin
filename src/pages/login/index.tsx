import type { LoginParams } from '@/interface/user/login';
import type { FC } from 'react';

import { App, Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LocaleFormatter, useLocale } from '@/locales';
import { useUserStore } from '@/stores/userStore';

const initialValues: LoginParams = {
  username: 'guest',
  password: 'guest',
  // remember: true
};

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formatMessage } = useLocale();
  const userStore = useUserStore();
  const [loading, setLoading] = useState(false);
  const { message: $message } = App.useApp();

  const onFinished = async (data: LoginParams) => {
    setLoading(true);
    const res = await userStore.login(data);

    setLoading(false);

    if (!res.status) {
      return $message.error(res.message || '服务器异常');
    }

    // 清空所有 swr 缓存
    // mutate(() => true, undefined, false);

    const formUrlPath = new URLSearchParams(location.search).get('from');
    const from = decodeURIComponent(formUrlPath || '');
    const isSameUser = userStore.username === data.username; // 同一个账号重新登录才返回原页面

    isSameUser && from ? navigate(from) : navigate('/');
  };

  return (
    <div className="flex-center bg-gradient-to-r from-cyan-500 to-primary">
      <Form<LoginParams>
        onFinish={onFinished}
        className="w300 pt50 px40 rounded-10 bg-white"
        initialValues={initialValues}
      >
        <h2 className="text-center">REACT ANTD ADMIN</h2>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'gloabal.tips.enterUsernameMessage',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'gloabal.tips.username',
            })}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'gloabal.tips.enterPasswordMessage',
              }),
            },
          ]}
        >
          <Input
            type="password"
            placeholder={formatMessage({
              id: 'gloabal.tips.password',
            })}
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>
            <LocaleFormatter id="gloabal.tips.rememberUser" />
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" className="w-full" loading={loading}>
            <LocaleFormatter id="gloabal.tips.login" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
