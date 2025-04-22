import React, { useState } from 'react';
import styles from './ContactsPage.module.css';

// 模拟联系人数据
const contacts = [
  { name: 'Alice', avatar: 'assets/images/av1.jpg' },
  { name: 'Bob', avatar: 'https://example.com/avatar2.jpg' },
  { name: 'Charlie', avatar: 'https://example.com/avatar3.jpg' },
  // 可以继续添加更多联系人
];

// 模拟群聊数据，添加群聊成员信息
const groups = [
  { 
    name: '工作群', 
    id: 1,
    members: [
      { name: '张三', avatar: 'assets/images/zs.jpg' },
      { name: '李四', avatar: 'assets/images/ls.jpg' }
    ]
  },
  // 可以继续添加更多群聊
];

// 模拟标签数据
const tags = [
  { name: '同事', contacts: [ { name: 'Alice', avatar: 'assets/images/av1.jpg' } ] },
  { name: '朋友', contacts: [ { name: 'Bob', avatar: 'https://example.com/avatar2.jpg' } ] },
];

// 新增一个大标签
const mainTag = {
  name: '标签',
  subTags: tags
};

// 修改为直接对 contacts 数组排序
const allContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

const ContactsPage = () => {
  // 控制每个分组（包括群聊分组、标签分组）的展开与折叠状态
  const [expandedSections, setExpandedSections] = useState({});
  // 控制新建群聊弹窗的显示与隐藏
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  // 切换分组展开与折叠状态
  const toggleSection = (sectionName) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  // 控制标签展开与折叠状态
  const [expandedTagSections, setExpandedTagSections] = useState({});

  // 切换标签分组展开与折叠状态
  const toggleTagSection = (sectionName) => {
    setExpandedTagSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  // 显示新建群聊弹窗
  const handleCreateGroup = () => {
    setShowCreateGroupModal(true);
  };

  // 关闭新建群聊弹窗
  const handleCloseModal = () => {
    setShowCreateGroupModal(false);
  };

  let lastInitial = null;

  // 新增状态用于保存群聊名称
  const [groupName, setGroupName] = useState('');

  return (
    <div className={styles.contactsContainer}>
      <div className={styles.header}>通讯录</div>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="搜索"
          className={styles.searchInput}
        />
      </div>

      <ul className={styles.contactList}>
        {/* 大标签分组 */}
        <li
          className={styles.sectionHeader}
          onClick={() => toggleSection(mainTag.name)}
        >
          <span className={expandedSections[mainTag.name] ? styles.arrowDown : styles.arrowRight} />
          {mainTag.name}
        </li>
        {expandedSections[mainTag.name] && (
          mainTag.subTags.map((subTag) => (
            <React.Fragment key={subTag.name}>
              <li
                className={styles.subSectionHeader}
                onClick={() => toggleSection(subTag.name)}
              >
                <span className={expandedSections[subTag.name] ? styles.arrowDown : styles.arrowRight} />
                {subTag.name}
              </li>
              {expandedSections[subTag.name] && (
                subTag.contacts.map((contact, contactIndex) => (
                  <li key={contactIndex} className={styles.contactItem}>
                    <div className={styles.contactInfo}>
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className={styles.contactAvatar}
                      />
                      <span className={styles.contactName}>{contact.name}</span>
                    </div>
                    <input type="checkbox" />
                  </li>
                ))
              )}
            </React.Fragment>
          ))
        )}

        {/* 群聊分组 */}
        <li
          className={styles.sectionHeader}
          data-section="群聊"
          onClick={() => toggleSection('群聊')} // 确保点击事件调用 toggleSection 函数
        >
          <span className={expandedSections['群聊'] ? styles.arrowDown : styles.arrowRight} />
          群聊
          <span className={styles.addGroupButton} onClick={handleCreateGroup}>+</span>
        </li>
        {expandedSections['群聊'] && (
          groups.map((group) => (
            <React.Fragment key={group.id}>
              <li
                className={styles.subSectionHeader}
                onClick={() => toggleSection(`group-${group.id}`)}
              >
                <span className={expandedSections[`group-${group.id}`] ? styles.arrowDown : styles.arrowRight} />
                {group.name}
              </li>
              {expandedSections[`group-${group.id}`] && (
                group.members.map((member, memberIndex) => (
                  <li key={memberIndex} className={styles.contactItem}>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className={styles.contactAvatar}
                    />
                    <span className={styles.contactName}>{member.name}</span>
                  </li>
                ))
              )}
            </React.Fragment>
          ))
        )}

        {/* 联系人列表，添加首字母分割线 */}
        <li className={styles.sectionHeader}>联系人</li>
        {allContacts.map((contact, index) => {
          const initial = contact.name.charAt(0).toUpperCase();
          const isAlphanumeric = /^[A-Z0-9]$/.test(initial);
          const currentInitial = isAlphanumeric ? initial : '#';

          const divider = (currentInitial !== lastInitial) ? (
            <li key={`divider-${currentInitial}`} className={styles.initialDivider}>
              {currentInitial}
            </li>
          ) : null;

          lastInitial = currentInitial;

          return (
            <>
              {divider}
              <li key={index} className={styles.contactItem}>
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className={styles.contactAvatar}
                />
                <span className={styles.contactName}>{contact.name}</span>
              </li>
            </>
          );
        })}
      </ul>

      {/* 新建群聊弹窗 */}
      {showCreateGroupModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>新建群聊</h2>
              <span className={styles.closeButton} onClick={handleCloseModal}>×</span>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.groupNameInputContainer}>
                <input
                  type="text"
                  placeholder="输入群聊名称"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className={styles.groupNameInput}
                />
                <button onClick={handleCreateGroupSubmit} className={styles.createGroupButton}>创建群聊</button>
              </div>
              {/* 显示标签分组 */}
              <li
                className={styles.sectionHeader}
                onClick={() => toggleSection(mainTag.name)}
              >
                <span className={expandedSections[mainTag.name] ? styles.arrowDown : styles.arrowRight} />
                {mainTag.name}
              </li>
              {expandedSections[mainTag.name] && (
                mainTag.subTags.map((subTag) => (
                  <React.Fragment key={subTag.name}>
                    <li
                      className={styles.subSectionHeader}
                      onClick={() => toggleTagSection(subTag.name)}
                    >
                      <span className={expandedTagSections[subTag.name] ? styles.arrowDown : styles.arrowRight} />
                      {subTag.name}
                    </li>
                    {expandedTagSections[subTag.name] && (
                      subTag.contacts.flatMap(section => section.items).map((contact, contactIndex) => (
                        <li key={contactIndex} className={styles.contactItem}>
                          <div className={styles.contactInfo}>
                            <img
                              src={contact.avatar}
                              alt={contact.name}
                              className={styles.contactAvatar}
                            />
                            <span className={styles.contactName}>{contact.name}</span>
                          </div>
                          <input type="checkbox" />
                        </li>
                      ))
                    )}
                  </React.Fragment>
                ))
              )}
              {/* 显示所有联系人 */}
              <li className={styles.sectionHeader}>所有联系人</li>
              <ul>
                {allContacts.map((contact, index) => (
                  <li key={index} className={styles.contactItem}>
                    <div className={styles.contactInfo}>
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className={styles.contactAvatar}
                      />
                      <span className={styles.contactName}>{contact.name}</span>
                    </div>
                    <input type="checkbox" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;

// 处理创建群聊的逻辑
const handleCreateGroupSubmit = () => {
  // 这里可以添加实际的创建群聊逻辑，例如调用 API
  // console.log('创建群聊:', groupName);
  // handleCloseModal();
};