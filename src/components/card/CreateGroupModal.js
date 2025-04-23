import styles from './CreateGroupModal.module.css'; // 确保路径正确
import React from 'react'; // 确保已导入React
function CreateGroupModal( {handleCheckboxChange,
     handleCloseModal,
      handleCreateGroupSubmit, 
      groupName, 
      setGroupName,
      expandedSections,
        expandedTagSections, 
        toggleSection, allContacts,
         mainTag, selectedContactIds,
}) {
  return(
    <>
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
                      <input
                        type="checkbox"
                        checked={selectedContactIds.has(contact.contactId)}
                        onChange={() => handleCheckboxChange(contact.contactId)}
                      />
                    </li>
                  ))
                )}
              </React.Fragment>
            ))
          )}
          {/* 显示所有联系人 */}
          <li className={styles.sectionHeader}>所有联系人</li>
          {/* 添加新的类名 styles.scrollableList */}
          <ul className={styles.scrollableList}>
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
                <input
                  type="checkbox"
                  checked={selectedContactIds.has(contact.contactId)}
                  onChange={() => handleCheckboxChange(contact.contactId)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}
export default CreateGroupModal;