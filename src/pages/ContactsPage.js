import React, { useState, useEffect } from 'react';
import styles from './ContactsPage.module.css';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchContact, fetchGroup, fetchTag, updateGroup, updateTag } from '../store/modules/contactSlice'; 
import CreateTagModal from '../components/card/CreateTagModal';
import CreateGroupModal from '../components/card/CreateGroupModal';
// 导入 useNavigate
import { useNavigate } from 'react-router-dom';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchContact());
    dispatch(fetchGroup()); 
    dispatch(fetchTag());
    console.log("页面被加载");
  }, [dispatch]);
  const contacts = useSelector((state) => state.contact.contact); 
  const groups =  useSelector((state) => state.contact.group); 
  const tags = useSelector((state) => state.contact.tag); 
  const mainTag = {
    name: '标签',
    subTags: tags
  };
  const allContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  const [expandedSections, setExpandedSections] = useState({});
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showCreateTagModal, setShowCreateTagModal] = useState(false);

  // 新增删除确认状态
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState(''); // 'tag' 或 'group'
  const [deleteIndex, setDeleteIndex] = useState(null);
  let lastInitial = null;
  const toggleSection = (sectionName) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  const handleCreateGroup = (e) => {
    e.stopPropagation();
    setShowCreateGroupModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateGroupModal(false);
  };

  const [groupName, setGroupName] = useState('');
  const [selectedContactIds, setSelectedContactIds] = useState(new Set());

  const handleCheckboxChange = (contactId) => {
    const newSelectedIds = new Set(selectedContactIds);
    if (newSelectedIds.has(contactId)) {
      newSelectedIds.delete(contactId);
    } else {
      newSelectedIds.add(contactId);
    }
    setSelectedContactIds(newSelectedIds);
    console.log('Selected contact IDs:', Array.from(newSelectedIds)); 
  };

  const handleCreateGroupSubmit = () => {
    const newGroupId = groups.length > 0 ? Math.max(...groups.map(g => g.groupId)) + 1 : 1;
    const newGroup = {
      name: groupName,
      groupId: newGroupId,
      avatar: '',
      members: Array.from(selectedContactIds).map(id => {
        const contact = contacts.find(c => c.contactId === id);
        return {
          name: contact ? contact.name : '',
          avatar: contact ? contact.avatar : ''
        };
      })
    };
  
    const updatedGroups = [...groups, newGroup];
    dispatch(updateGroup(updatedGroups));
    console.log('创建群聊:', groupName, "群聊成员:", Array.from(selectedContactIds));
    handleCloseModal();
  };

  const [tagName, setTagName] = useState('');
  const [selectedTagContactIds, setSelectedTagContactIds] = useState(new Set());

  const handleTagCheckboxChange = (contactId) => {
    const newSelectedIds = new Set(selectedTagContactIds);
    if (newSelectedIds.has(contactId)) {
      newSelectedIds.delete(contactId);
    } else {
      newSelectedIds.add(contactId);
    }
    setSelectedTagContactIds(newSelectedIds);
    console.log('Selected tag contact IDs:', Array.from(newSelectedIds));
  };

  const handleCreateTagSubmit = () => {
    const newTag = {
      name: tagName,
      contacts: Array.from(selectedTagContactIds).map(id => {
        const contact = contacts.find(c => c.contactId === id);
        return {
          contactId: id,
          name: contact ? contact.name : '',
          avatar: contact ? contact.avatar : ''
        };
      })
    };

    const updatedTags = [...tags, newTag];
    dispatch(updateTag(updatedTags));
    console.log('创建标签:', tagName, "标签成员:", Array.from(selectedTagContactIds));
    setShowCreateTagModal(false);
  };

  const handleCreateTag = (e) => {
    e.stopPropagation(); 
    setShowCreateTagModal(true);
    console.log("显示新建标签弹窗");
  };

  const handleCloseTagModal = () => {
    setShowCreateTagModal(false);
  };

  // 处理删除确认
  const handleDeleteConfirm = () => {
    if (deleteType === 'tag') {
      const updatedTags = tags.filter((_, index) => index !== deleteIndex);
      dispatch(updateTag(updatedTags));
    } else if (deleteType === 'group') {
      const updatedGroups = groups.filter((_, index) => index !== deleteIndex);
      dispatch(updateGroup(updatedGroups));
    }
    setShowDeleteConfirm(false);
    setDeleteType('');
    setDeleteIndex(null);
  };

  // 处理删除取消
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteType('');
    setDeleteIndex(null);
  };

  // 处理联系人点击事件
  const handleContactClick = (contactId) => {
    // 假设聊天界面的路由路径为 /chat/:contactId
    navigate(`/chat/${contactId}`);
  };

  // 处理群聊点击事件
  const handleGroupClick = (groupId) => {
    // 假设群聊聊天界面的路由路径为 /group-chat/:groupId
    navigate(`/group-chat/${groupId}`);
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
        {/* 大标签分组，添加 + 号按钮 */}
        <li
          className={styles.sectionHeader}
          onClick={() => toggleSection(mainTag.name)}
        >
          <span className={expandedSections[mainTag.name] ? styles.arrowDown : styles.arrowRight} />
          {mainTag.name}
          <span className={styles.addGroupButton} onClick={handleCreateTag}>+</span>
        </li>
        {expandedSections[mainTag.name] && (
          mainTag.subTags.map((subTag, index) => (
            <React.Fragment key={subTag.name}>
              <li
                className={styles.subSectionHeader}
              >
                <span 
                  className={expandedSections[subTag.name] ? styles.arrowDown : styles.arrowRight} 
                  onClick={() => toggleSection(subTag.name)}
                />
                {subTag.name}
                <span 
                  className={styles.deleteButton} 
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setDeleteType('tag');
                    setDeleteIndex(index);
                  }}
                >
                  —
                </span>
              </li>
              {expandedSections[subTag.name] && (
                subTag.contacts.map((contact, contactIndex) => (
                  <li 
                    key={contactIndex} 
                    className={styles.contactItem}
                    onClick={() => handleContactClick(contact.contactId)}
                  >
                    <div className={styles.contactInfo}>
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className={styles.contactAvatar}
                      />
                      <span className={styles.contactName}>{contact.name}</span>
                    </div>
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
          onClick={() => toggleSection('群聊')} 
        >
          <span className={expandedSections['群聊'] ? styles.arrowDown : styles.arrowRight} />
          群聊
          <span className={styles.addGroupButton} onClick={handleCreateGroup}>+</span>
        </li>
        {expandedSections['群聊'] && (
          groups.map((group, index) => (
            <React.Fragment key={group.groupId}>
              <li
                className={styles.subSectionHeader}
                onClick={() => handleGroupClick(group.groupId)} // 添加点击事件
              >
                <span 
                  className={expandedSections[`group-${group.groupId}`] ? styles.arrowDown : styles.arrowRight} 
                  onClick={(e) => {
                    e.stopPropagation(); // 阻止事件冒泡，避免触发群聊跳转
                    toggleSection(`group-${group.groupId}`);
                  }}
                />
                {group.name}
                <span 
                  className={styles.deleteButton} 
                  onClick={(e) => {
                    e.stopPropagation(); // 阻止事件冒泡，避免触发群聊跳转
                    setShowDeleteConfirm(true);
                    setDeleteType('group');
                    setDeleteIndex(index);
                  }}
                >
                  —
                </span>
              </li>
              {expandedSections[`group-${group.groupId}`] && (
                group.members.map((member, memberIndex) => (
                  <li 
                    key={memberIndex} 
                    className={styles.contactItem}
                    onClick={() => handleContactClick(member.contactId)}
                  >
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
              <li 
                key={index} 
                className={styles.contactItem}
                onClick={() => handleContactClick(contact.contactId)}
              >
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
        <CreateGroupModal 
          handleCheckboxChange={handleCheckboxChange}
          handleCloseModal={handleCloseModal}
          handleCreateGroupSubmit={handleCreateGroupSubmit}
          groupName={groupName}
          setGroupName={setGroupName}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          allContacts={allContacts}
          mainTag={mainTag}
          selectedContactIds={selectedContactIds}
        />
      )}
      {/* 新建标签弹窗 */}
      {showCreateTagModal && (
        <CreateTagModal 
          tagName={tagName}
          setTagName={setTagName}
          handleCreateTagSubmit={handleCreateTagSubmit}
          handleCloseTagModal={handleCloseTagModal}
          allContacts={allContacts}
          selectedTagContactIds={selectedTagContactIds}
          handleTagCheckboxChange={handleTagCheckboxChange}
        />
      )}

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>确认删除</h2>
            </div>
            <div className={styles.modalBody}>
              <p>确认删除{deleteType === 'tag' ? '标签' : '群聊'}吗？</p>
              <button onClick={handleDeleteConfirm} className={styles.confirmButton}>确认</button>
              <button onClick={handleDeleteCancel} className={styles.cancelButton}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;

