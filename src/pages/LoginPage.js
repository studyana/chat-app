import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/chat/1'); // 登录成功后跳转到聊天页面
  };

  return (
    <div>
      <h1>登录页面</h1>
      <button onClick={handleLogin}>登录</button>
    </div>
  );
};

export default LoginPage;