import React, { useState } from 'react';
import '../../styles/globals.css';

const Alert = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(!isOpen);
    onClose();
  };

  return (
    isOpen && (
      <div className="flex items-center justify-center fixed top-16 w-full z-40">
        <label className="min-w-60 h-auto p-4 m-4 bg-red-100 border border-red-600 rounded cursor-pointer font-sans font-normal text-sm bg-lightdarkred">
          <input
            type="checkbox"
            className="hidden"
            autoComplete="off"
            onChange={handleClose}
          />
          <div className="flex items-center flex-row-reverse text-white gap-4">
            <span className="float-right pt-1 text-xs cursor-pointer" onClick={handleClose}>
              X
            </span>
            <span className="mx-auto sm:text-lg">{message}</span>
          </div>
        </label>
      </div>
/*       <div className={styles['alert-container']}>
        <label className={styles['alert']}>
          <input
            type="checkbox"
            className={styles.alertCheckbox}
            autoComplete="off"
            onChange={handleClose}
          />
          <div className={`${styles.alert} ${styles.error}`}>
            <span className={styles.alertClose} onClick={handleClose}>
              X
            </span>
            <span className={styles.alertText}>{message}</span>
          </div>
        </label>
      </div> */
    )
  );
};

export default Alert;
