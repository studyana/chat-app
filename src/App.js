
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 嵌套路由 */}
          <Route path="messages" element={<></>} /> 
          <Route path="contacts" element={<></>} />
          <Route path="profile" element={<></>} />
        </Route>
        <Route path="/chat/:contactId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;
