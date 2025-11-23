"use client"
import React, { useState } from "react"
import Header from "@/components/Header"
import CartModal from "@/features/cart/CartModal"
import ProductWhislist from "@/features/productList/ProductWhislist"
import Modal from "@/components/Modal"
import { useModal } from "@/hooks/useModal"

const LayoutClient = ({ children }) => {
  const { isOpenModalCart, handleHideModalCart, handleOpenModalCart } =
    useModal()
  const [isOpenWishlist, setIsOpenWishlist] = useState(false)
  const handleOpenModalWishlist = () => setIsOpenWishlist(true)
  const handleHideModalWishlist = () => setIsOpenWishlist(false)

  return (
    <div>
      {isOpenModalCart && (
        <CartModal handleHideModalCart={handleHideModalCart} />
      )}

      {isOpenWishlist && (
        <Modal onClose={handleHideModalWishlist}>
          <ProductWhislist onClose={handleHideModalWishlist} />
        </Modal>
      )}

      <Header
        handleOpenModalCart={handleOpenModalCart}
        handleOpenModalWishlist={handleOpenModalWishlist}
      />

      {children}
    </div>
  )
}

export default LayoutClient
