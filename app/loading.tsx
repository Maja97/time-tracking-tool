import React from 'react';
import styles from '@app/_styles/loading.module.scss';

function Loading() {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayInner}>
        <div className={styles.overlayContent}>
          <span className={styles.spinner}></span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
