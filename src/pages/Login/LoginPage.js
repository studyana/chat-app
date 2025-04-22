import React, { useState } from 'react';
import { Card, Button, Input, Form } from 'antd';
import styles from './LoginPage.module.css';
import { useDispatch } from 'react-redux';
// 假设 setToken 从 tokenSlice 导入
import { fetchLogin, setToken } from '../../store/modules/tokenSlice'; 
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form] = Form.useForm();
    const navigate = useNavigate(); // 用于导航到其他页面，如聊天界面等
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        if (isLogin) {
          // 模拟登录逻辑
          console.log('登录信息:', values);
          await dispatch(fetchLogin(values)); // 假设 fetchLogin 是异步的，需要使用 dispatch  
          navigate('/');
          message.success('登录成功');

        } else {
          // 模拟注册逻辑
          console.log('注册信息:', values);
          message.success('注册成功');
        }
    };

    return (
      <div className={styles.loginContainer}>
        <Card className={styles.loginCard}>
          <h2 className={styles.cardTitle}>{isLogin ? '登录' : '注册'}</h2>
          <Form
            form={form}
            name="login-register"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: '请输入手机号!' },
                { 
                  pattern: /^1[3-9]\d{9}$/, 
                  message: '请输入有效的手机号格式!' 
                }
              ]}
              className={styles.formGroup}
            >
                <Input placeholder="手机号" className={styles.inputField} />
            </Form.Item>
            {!isLogin && (
            <Form.Item
              name="captcha"
              rules={[{ required: true, message: '请输入验证码!' }]}
              className={styles.formGroup}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
                <Input
                  placeholder="验证码"
                  className={styles.inputField}
                  style={{ flex: 2 }}
                />
                <Button className={styles.captchaButton}>获取验证码</Button>
              </div>
            </Form.Item>
            )}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 8, message: '密码长度必须大于等于 8 位!' },
                { max: 16, message: '密码长度必须小于等于 16 位!' }
              ]}
              className={styles.formGroup}
            >
              <Input.Password placeholder="密码" className={styles.inputField} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.submitButton}
              >
                {isLogin ? '登录' : '注册'}
              </Button>
            </Form.Item>
          </Form>
          <div className={styles.switchText} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? '没有账号，去注册' : '已有账号，去登录'}
          </div>
        </Card>
      </div>
    );
};

export default LoginPage;