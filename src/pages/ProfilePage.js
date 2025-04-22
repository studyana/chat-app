
import React, { useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchUserInfo } from '../store/modules/userSlice';
import { useDispatch } from'react-redux';

const ProfilePage = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(fetchUserInfo()); 
    console.log('页面加载完成');
  }, [dispatch]); // 空数组表示只在组件挂载时执行一次
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>个人信息</div>
      <div className={styles.userInfo}>
        <img src={userInfo.avatar} alt="头像" className={styles.avatar} />
        <div className={styles.userText}>
          <div className={styles.userName}>{userInfo.name}</div>
          <div className={styles.signature}>{userInfo.signature}</div>
        </div>
      </div>
      <div className={styles.infoList}>
        <div className={styles.infoItem}>
          <div className={styles.infoItemText}>我的二维码</div>
          <div className={styles.arrow} />
        </div>
        <Link to="/more-profile" className={styles.infoItemLink}>
          <div className={styles.infoItem}>
            <div className={styles.infoItemText}>更多信息</div>
            <div className={styles.arrow} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;