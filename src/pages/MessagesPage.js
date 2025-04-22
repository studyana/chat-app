import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

const initialMessages = [
  { id: 1, name: '张三', lastMessage: '你好，在吗？', unreadCount: 3 },
  { id: 2, name: '李四', lastMessage: '明天开会记得参加', unreadCount: 0 },
  { id: 3, name: '王五', lastMessage: '文件发你了，查收一下', unreadCount: 5 },
  { id: 4, name: '赵六', lastMessage: '你好，在吗？', unreadCount: 0 },
  { id: 5, name: '陈七', lastMessage: '明天开会记得参加', unreadCount: 0 },
  { id: 6, name: '周八', lastMessage: '文件发你了，查收一下', unreadCount: 0 },
  { id: 7, name: '吴九', lastMessage: '你好，在吗？', unreadCount: 0 },
  { id: 8, name: '郑十', lastMessage: '明天开会记得参加', unreadCount: 0 },
  { id: 9, name: '冯十一', lastMessage: '文件发你了，查收一下', unreadCount: 0 },
  { id: 10, name: '陈十二', lastMessage: '你好，在吗？', unreadCount: 0 },
  { id: 11, name: '王十三', lastMessage: '明天开会记得参加', unreadCount: 0 },
  { id: 12, name: '李十四', lastMessage: '文件发你了，查收一下', unreadCount: 0 }
  ,
];

const MessagesPage = () => {
  const [messages, setMessages] = useState(initialMessages);

  const markAsRead = (messageId) => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === messageId ? { ...message, unreadCount: 0 } : message
      )
    );
    console.log(`消息 ${messageId} 已标记为已读`); // 调试用，实际应用中可以移除这行代码，或者替换为实际的逻辑实现
  };

  return (
    <div>
      {/* <h1>消息界面</h1> */}
      <div style={{ 
        maxHeight: 'calc(100vh - 60px)', 
        overflowY: 'auto', 
        border: '1px solid #ccc',
        borderRight:'none',
        borderLeft:'none',
        // 为底部导航栏预留空间
        paddingBottom: '60px' 
      }}>
        {messages.map((message) => (
          <Link
            key={message.id}
            to={`/chat/${message.id}`}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '10px', 
              borderBottom: '1px solid #ccc', 
              textDecoration: 'none', 
              color: 'black' 
            }}
            onClick={() => markAsRead(message.id)}
          >
            <div>
              <h3>{message.name}</h3>
              <p>{message.lastMessage}</p>
            </div>
            {message.unreadCount > 0 && (
              <div style={{
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                width: '12px',
                height: '20px',
                fontSize: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 4px'
              }}>
                {message.unreadCount > 99 ? '99+' : message.unreadCount}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;