
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import ChatPage from './pages/ChatPage';
import MessagesPage from './pages/MessagesPage';
import ContactsPage from './pages/ContactsPage';
import ProfilePage from './pages/ProfilePage';
import MoreProfile from './pages/MoreProfile';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 当访问父路由时，默认显示 MessagesPage */}
          <Route index element={<MessagesPage />} />
          <Route path="messages" element={<MessagesPage />} /> 
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/chat/:contactId" element={<ChatPage />} />
        <Route path="/more-profile" element={<MoreProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
