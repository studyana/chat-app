import React from 'react';
import { Link } from 'react-router-dom';

const messages = [
  { id: 1, name: '张三', lastMessage: '你好，在吗？' },
  { id: 2, name: '李四', lastMessage: '明天开会记得参加' },
  { id: 3, name: '王五', lastMessage: '文件发你了，查收一下' },
];

const MessagesPage = () => {
  return (
    <div>
      <h1>消息界面</h1>
      {messages.map((message) => (
        <Link
          key={message.id}
          to={`/chat/${message.id}`}
          style={{ display: 'block', padding: '10px', borderBottom: '1px solid #ccc', textDecoration: 'none', color: 'black' }}
        >
          <div>
            <h3>{message.name}</h3>
            <p>{message.lastMessage}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MessagesPage;