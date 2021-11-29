import { css } from '@emotion/react';
import { Button, Form, Input } from 'antd';
import JSCookie from 'js-cookie';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { apiLogin } from '~/api/ccenter-app-usermgr/user';
import { setUserState } from '~/store/user.store';

const initValues = {
  Username: 'admin',
  Password: 'Winme0308_',
  // remember: true
};

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  const onSubmit = async (form: any) => {
    const res = await apiLogin(form);

    if (res.CODE === 'ok') {
      JSCookie.set('CSRFToken', res.DATA.CSRFToken);
      dispatch(
        setUserState({
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
      <Form className="form" onFinish={onSubmit} initialValues={initValues}>
        <h2>APPNODE 受控端</h2>
        <Form.Item label="用户名" name="Username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name="Password" rules={[{ required: true, message: '请输入密码' }]} required label="密码">
          <Input.Password></Input.Password>
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
  background: #f0f2f5;
  .form {
    width: 300px;
    padding: 50px 40px;
    border-radius: 10px;
    background-color: #ffffff;
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
