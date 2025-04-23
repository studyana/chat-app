import React from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { contactId } = useParams();

  return (
    <div>
      <h1>与 ID 为 {contactId} 的用户聊天</h1>
      {/* 这里可以添加聊天消息展示、输入框等功能 */}
    </div>
  );
};

export default ChatPage;