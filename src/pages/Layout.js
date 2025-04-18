import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import MessagesPage from './MessagesPage';
import ContactsPage from './ContactsPage';
import ProfilePage from './ProfilePage';

const Layout = () => {
  const [activeItem, setActiveItem] = useState('messages');
  const [unreadMessages, setUnreadMessages] = useState(5); 
  const location = useLocation();

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    console.log('Layout 组件已挂载');
    return () => {
      console.log('Layout 组件将卸载');
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* 使用相对路径 */}
        <Route path="messages" element={<MessagesPage />} /> 
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
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
              <div className="unread-badge">
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