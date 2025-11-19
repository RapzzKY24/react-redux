"use client";
const { useState } = require("react");

export const useModal = () => {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);

  const handleOpenModalCart = () => {
    setIsOpenModalCart(true);
  };

  const handleHideModalCart = () => {
    setIsOpenModalCart(false);
  };

  return {
    isOpenModalCart,
    handleOpenModalCart,
    handleHideModalCart,
  };
};
