
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import ChatPage from './pages/ChatView/ChatPage';
import MessagesPage from './pages/MessagesPage';
import ContactsPage from './pages/ContactsPage';
import ProfilePage from './pages/ProfilePage';
import MoreProfile from './pages/MoreProfile';
import LoginPage from './pages/Login/LoginPage';
import PrivateRoute from './pages/Privateroute';
import GroupChatPage from './pages/ChatView/GroupChatPage';
const App = () => {
  return (
    
    <Router>  
      <Routes>
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          {/* 当访问父路由时，默认显示 MessagesPage */}
          <Route index element={<MessagesPage />} />
          <Route path="messages" element={<MessagesPage />} /> 
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/chat/:contactId" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path="/group-chat/:groupId" element={<PrivateRoute><GroupChatPage /></PrivateRoute>} />
        <Route path="/more-profile" element={<PrivateRoute><MoreProfile /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    
  );
};

export default App;
