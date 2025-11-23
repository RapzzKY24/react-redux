"use client"
import { selectorTotalCartItem } from "@/features/cart/cartSlice"
import { ShoppingCart, Heart } from "lucide-react"
import React from "react"
import { useSelector } from "react-redux"
import { selectWishlistIds } from "@/features/productList/productSlice"

const Header = ({ handleOpenModalCart, handleOpenModalWishlist }) => {
  const totalCartItem = useSelector(selectorTotalCartItem)
  const wishlistIds = useSelector(selectWishlistIds)
  const totalWishlist = wishlistIds.length

  return (
    <div className="bg-indigo-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <h1 className="font-bold text-gray-100 text-3xl">Mini E-commerce</h1>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-full bg-indigo-800 p-2 text-gray-50"
              onClick={handleOpenModalWishlist}
            >
              {totalWishlist > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs bg-pink-500 flex items-center justify-center">
                  {totalWishlist}
                </span>
              )}
              <Heart
                size={22}
                className="text-pink-300"
                fill="currentColor"
                stroke="currentColor"
              />
            </button>

            <button
              type="button"
              className="relative rounded-full bg-indigo-800 p-2 text-gray-50"
              onClick={handleOpenModalCart}
            >
              {totalCartItem > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-sm bg-red-500 flex items-center justify-center">
                  {totalCartItem}
                </span>
              )}
              <ShoppingCart size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
