import React from 'react';
import styles from './Avatar.module.css';

const Avatar = ({ src, size = 'medium' }) => {
  let avatarClass = styles.avatar;
  if (size === 'small') {
    avatarClass += ` ${styles.small}`;
  } else if (size === 'large') {
    avatarClass += ` ${styles.large}`;
  }

  return <img src={src} alt="Avatar" className={avatarClass} />;
};

export default Avatar;