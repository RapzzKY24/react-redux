"use client";
import Header from "@/components/Header";
import CartModal from "@/features/cart/CartModal";
import { useModal } from "@/hooks/useModal";
import React from "react";

const LayoutClient = ({ children }) => {
  const { isOpenModalCart, handleHideModalCart, handleOpenModalCart } =
    useModal();
  return (
    <div>
      {isOpenModalCart ? (
        <CartModal handleHideModalCart={handleHideModalCart} />
      ) : null}
      <Header handleOpenModalCart={handleOpenModalCart} />
      {children}
    </div>
  );
};

export default LayoutClient;
