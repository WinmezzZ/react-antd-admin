import { css } from '@emotion/react';
import { Button, Form, Input } from 'antd';
import JSCookie from 'js-cookie';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { apiLogin } from '~/api/ccenter-app-usermgr/user.api';
import { LoginParams } from '~/interface/ccenter-app-usermgr/user.interface';
import { setUserState } from '~/store/user.store';

const initValues: LoginParams = {
  Username: 'admin',
  Password: 'Winme0308_',
  // remember: true
};

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (form: LoginParams) => {
    const res = await apiLogin(form);

    if (res.CODE === 'ok') {
      JSCookie.set('CSRFToken', res.DATA.CSRFToken);
      dispatch(
        setUserState({
          isLogin: true,
          CSRFToken: res.DATA.CSRFToken,
        }),
      );
      if (location.state?.from) {
        navigate(location.state?.from);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div css={styles}>
      <Form<LoginParams> className="form bg-1" onFinish={onSubmit} initialValues={initValues}>
        <h2>APPNODE 受控端</h2>
        <Form.Item<LoginParams> name="Username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="用户名"></Input>
        </Form.Item>
        <Form.Item<LoginParams> name="Password" rules={[{ required: true, message: '请输入密码' }]} required>
          <Input.Password placeholder="密码"></Input.Password>
        </Form.Item>
        <Button className="button" htmlType="submit" type="primary">
          登录
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 300;
    padding: 50px 40px;
    border-radius: 10px;
    h2 {
      text-align: center;
    }
    .button {
      width: 100%;
      margin: 0 auto;
      margin-top: 12px;
    }
  }
`;
