import React, { useState } from 'react';
import styles from './ContactsPage.module.css';

// 模拟联系人数据
const contacts = [
  { section: 'A', items: [{ name: 'Alice', avatar: 'https://example.com/avatar1.jpg' },{ name: 'Bob', avatar: 'https://example.com/avatar2.jpg' }] },
  { section: 'B', items: [{ name: 'Bob', avatar: 'https://example.com/avatar2.jpg' }] },
  { section: 'C', items: [{ name: 'Charlie', avatar: 'https://example.com/avatar3.jpg' }] },
];

// 模拟群聊数据
const groups = [
  { name: '工作群', id: 1 },
  { name: '兴趣小组', id: 2 },
  { name: '校友群', id: 3 },
];

const ContactsPage = () => {
  // 控制每个分组（包括群聊分组）的展开与折叠状态
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionName) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

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
        {/* 群聊分组 */}
        <li
          className={styles.sectionHeader}
          data-section="群聊"
          onClick={() => toggleSection('群聊')}
        >
          <span className={expandedSections['群聊'] ? styles.arrowDown : styles.arrowRight} />
          群聊
        </li>
        {expandedSections['群聊'] && (
          groups.map((group) => (
            <li key={group.id} className={styles.contactItem}>
              <span className={styles.contactName}>{group.name}</span>
            </li>
          ))
        )}

        {/* 联系人分组列表 */}
        {contacts.map((section) => (
          <React.Fragment key={section.section}>
            <li
              className={styles.sectionHeader}
              onClick={() => toggleSection(section.section)}
            >
              <span className={expandedSections[section.section] ? styles.arrowDown : styles.arrowRight} />
              {section.section}
            </li>
            {expandedSections[section.section] && (
              section.items.map((contact, contactIndex) => (
                <li key={contactIndex} className={styles.contactItem}>
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className={styles.contactAvatar}
                  />
                  <span className={styles.contactName}>{contact.name}</span>
                </li>
              ))
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ContactsPage;