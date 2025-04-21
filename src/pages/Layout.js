import React, { useEffect, useState } from 'react';
import {  Link, useLocation, Outlet } from 'react-router-dom';

const Layout = () => {
  const [unreadMessages, setUnreadMessages] = useState(5); 
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(() => {
    // 根据当前路径初始化 activeItem
    if (location.pathname.includes('messages')) {
      return 'messages';
    } else if (location.pathname.includes('contacts')) {
      return 'contacts';
    } else if (location.pathname.includes('profile')) {
      return 'profile';
    }
    return 'messages';
  });

  const handleItemClick = (item) => {
    setActiveItem(item);
    setUnreadMessages(0);
  };

  useEffect(() => {
    console.log('Layout 组件已挂载');
    return () => {
      console.log('Layout 组件将卸载');
    };
  }, []);

  // 监听路径变化，更新 activeItem
  useEffect(() => {
    if (location.pathname.includes('messages')) {
      setActiveItem('messages');
    } else if (location.pathname.includes('contacts')) {
      setActiveItem('contacts');
    } else if (location.pathname.includes('profile')) {
      setActiveItem('profile');
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <Outlet />
      <div className="bottom-navigation">
        <Link
          to="messages"
          className={`nav-item ${activeItem === 'messages' ? 'active' : ''}`}
          onClick={() => handleItemClick('messages')}
        >
          <div style={{ position: 'relative' }}>
            <img
              src={`/assets/icons/${activeItem === 'messages' ? 'message_active' : 'message_default'}.svg`}
              alt="消息图标"
              style={{ width: '24px', height: '24px' }}
            />
            {unreadMessages > 0 && (
              <div className="unread-badge" style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {unreadMessages > 99 ? '99+' : unreadMessages}
              </div>
            )}
          </div>
          <span>消息</span>
        </Link>
        <Link
          to="contacts"
          className={`nav-item ${activeItem === 'contacts' ? 'active' : ''}`}
          onClick={() => handleItemClick('contacts')}
        >
          <img
            src={`/assets/icons/${activeItem === 'contacts' ? 'contact_active' : 'contact_default'}.svg`}
            alt="联系人图标"
            style={{ width: '24px', height: '24px' }}
          />
          <span>联系人</span>
        </Link>
        <Link
          to="profile"
          className={`nav-item ${activeItem === 'profile' ? 'active' : ''}`}
          onClick={() => handleItemClick('profile')}
        >
          <img
            src={`/assets/icons/${activeItem === 'profile' ? 'profile_active' : 'profile_default'}.svg`}
            alt="我的图标"
            style={{ width: '24px', height: '24px' }}
          />
          <span>我的</span>
        </Link>
      </div>
    </div>
  );
};

export default Layout;