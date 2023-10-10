import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState<string>();

  const closeModal = () => {
    setIsOpen(false);
    setItemId(undefined);
  };

  const openModal = (id: string) => {
    setIsOpen(true);
    setItemId(id);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    itemId
  };
};

export default useModal;
