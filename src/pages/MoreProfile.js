import React, { useState } from 'react';
import styles from './MoreProfile.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../store/userSlice';

const originalPassword = '123456';

const MoreProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [signature, setSignature] = useState(userInfo.signature);
  const [nickname, setNickname] = useState(userInfo.name);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarConfirm = () => {
    dispatch(updateUserInfo({ avatar }));
    console.log('新头像已保存:', avatar);
    alert('头像更改已保存');
  };

  const handlePasswordConfirm = () => {
    if (oldPassword === originalPassword) {
      console.log('新密码已保存:', newPassword);
      alert('密码更改已保存');
      setOldPassword('');
      setNewPassword('');
    } else {
      alert('原密码输入错误，请重新输入');
    }
  };

  const handleSignatureChange = (e) => {
    setSignature(e.target.value);
  };

  const handleSignatureConfirm = () => {
    dispatch(updateUserInfo({ signature }));
    console.log('新个性签名已保存:', signature);
    alert('个性签名更改已保存');
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNicknameConfirm = () => {
    dispatch(updateUserInfo({ name: nickname }));
    console.log('新昵称已保存:', nickname);
    alert('昵称更改已保存');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={styles.moreProfileContainer}>
      <div className={styles.formGroup}>
        <label>更改头像</label>
        <div className={styles.inputWithButton}>
          <input type="file" onChange={handleAvatarChange} />
          <button className={styles.confirmButton} onClick={handleAvatarConfirm}>
            确认更改
          </button>
        </div>
        <img src={avatar} alt="新头像" className={styles.previewAvatar} />
      </div>
      <div className={styles.formGroup}>
        <label>更改密码</label>
        <input
          type="password"
          placeholder="原密码"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          style={{ marginBottom: '5px' }}
        />
        <div className={styles.inputWithButton}>
          <input
            type="password"
            placeholder="新密码"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className={styles.confirmButton} onClick={handlePasswordConfirm}>
            确认更改
          </button>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label>更改个性签名</label>
        <div className={styles.inputWithButton}>
          <input type="text" value={signature} onChange={handleSignatureChange} />
          <button className={styles.confirmButton} onClick={handleSignatureConfirm}>
            确认更改
          </button>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label>更改昵称</label>
        <div className={styles.inputWithButton}>
          <input type="text" value={nickname} onChange={handleNicknameChange} />
          <button className={styles.confirmButton} onClick={handleNicknameConfirm}>
            确认更改
          </button>
        </div>
      </div>
      <button className={styles.logoutButton} onClick={handleLogout}>
        退出登录
      </button>
    </div>
  );
};

export default MoreProfile;