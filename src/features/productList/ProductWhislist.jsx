// src/features/product/ProductWhislist.jsx

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setWhislistItem, selectWishlistIds } from "./productSlice"
import Image from "next/image"

const ProductWhislist = ({ onClose }) => {
  const dispatch = useDispatch()

  const wishlistIds = useSelector(selectWishlistIds)
  const allProducts = useSelector((state) => state.product.items)

  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id))

  const handleRemove = (id) => {
    dispatch(setWhislistItem(id))
  }

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          My Wishlist ({wishlistProducts.length})
        </h2>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>

      {wishlistProducts.length === 0 ? (
        <p className="text-sm text-gray-500">
          Wishlist kamu masih kosong. Tambahin dulu dari daftar produk.
        </p>
      ) : (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {wishlistProducts.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 border rounded-lg px-3 py-2"
            >
              <div className="w-14 h-14 shrink-0 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </p>
                <p className="text-sm font-semibold text-indigo-600 mt-1">
                  ${item.price}
                </p>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-xs px-2 py-1 border border-red-400 text-red-500 rounded-md hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductWhislist
