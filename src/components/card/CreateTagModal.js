import styles from './CreateTagModal.module.css';
function CreateTagModal ({
    tagName, setTagName, handleCreateTagSubmit, handleCloseTagModal, allContacts, selectedTagContactIds, handleTagCheckboxChange
}){
    return(
    <>
    <div className={styles.modal}>
        <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
            <h2>新建标签</h2>
            <span className={styles.closeButton} onClick={handleCloseTagModal}>×</span>
        </div>
        <div className={styles.modalBody}>
            <div className={styles.groupNameInputContainer}>
            <input
                type="text"
                placeholder="输入标签名称"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className={styles.groupNameInput}
            />
            <button onClick={handleCreateTagSubmit} className={styles.createGroupButton}>创建标签</button>
            </div>
            {/* 显示所有联系人 */}
            <li className={styles.sectionHeader}>所有联系人</li>
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
                    checked={selectedTagContactIds.has(contact.contactId)}
                    onChange={() => handleTagCheckboxChange(contact.contactId)}
                />
                </li>
            ))}
            </ul>
        </div>
        </div>
    </div>
    </>
    );
}
export default CreateTagModal;