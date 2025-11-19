"use client";
import { selectorTotalCartItem } from "@/features/cart/cartSlice";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Header = ({ handleOpenModalCart }) => {
  const totalCartItem = useSelector(selectorTotalCartItem);

  return (
    <div className="bg-indigo-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <h1 className="font-bold text-gray-100 text-3xl">Mini E-commerce</h1>
          <button
            type="submit"
            className="relative rounded-full bg-indigo-800 p-2 text-gray-50"
            onClick={handleOpenModalCart}
          >
            {totalCartItem ? (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-sm bg-red-500 flex items-center justify-center">
                {totalCartItem}
              </span>
            ) : (
              <span className="hidden" />
            )}
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
