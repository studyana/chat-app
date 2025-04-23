import React from 'react';
import { useParams } from 'react-router-dom';

const GroupChatPage = () => {
  const { groupId } = useParams();

  return (
    <div>
      <h1>在 ID 为 {groupId} 的群聊聊天</h1>
      {/* 这里可以添加聊天消息展示、输入框等功能 */}
    </div>
  );
};

export default GroupChatPage;