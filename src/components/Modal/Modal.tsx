import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import Text, { TextTag, TextView } from 'components/Text';

import style from './Modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={style.overlay} onClick={onClose}>
      <div className={clsx(style.modal, className)} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          {title && (
            <Text tag={TextTag.H2} view={TextView.P_20}>
              {title}
            </Text>
          )}
          <button className={style.closeButton} onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        <div className={style.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
