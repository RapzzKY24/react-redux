"use client";

import Modal from "@/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  selectorCartItem,
  selectorPriceCartItem,
  selectorTotalCartItem,
} from "./cartSlice";
import Image from "next/image";

const CartModal = ({ handleHideModalCart }) => {
  const dispatch = useDispatch();
  const handleClickBuy = (product) => {
    dispatch(addItemToCart(product));
  };
  const handleRemoveItem = (product) => {
    dispatch(removeItemFromCart(product));
  };
  const cartItems = useSelector(selectorCartItem);
  const totalItem = useSelector(selectorTotalCartItem);
  const totalPrice = useSelector(selectorPriceCartItem);

  const handleCheckoutWhatsapp = () => {
    if (totalItem === 0) return;
    const phoneNumber = "6289508627182";
    const message = encodeURIComponent(
      `Hallo saya ingin membeli ${totalItem} barang dengan total harga ${totalPrice}`
    );
    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(URL, "_blank");
  };

  return (
    <Modal onClose={handleHideModalCart}>
      <div className="flex flex-col gap-4 w-full lg:w-[900px]">
        {/* header */}
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <span className="text-sm text-gray-500">
            {totalItem} item • ${totalPrice}
          </span>
        </div>

        {/* list produk */}
        <div className="flex flex-col gap-4 max-h-[500px] overflow-auto pr-1">
          {cartItems.length === 0 && (
            <p className="text-sm text-gray-500">Cart masih kosong.</p>
          )}

          {cartItems.map((product) => (
            <div
              key={product.id}
              className="flex gap-4 border-b border-blue-200 pb-3"
            >
              <div className="w-[90px] h-[90px] overflow-hidden rounded-md shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  height={500}
                  width={500}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="capitalize text-sm sm:text-base font-semibold">
                  {product.title}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-sm">
                  <span className="text-gray-500">${product.price}</span>
                  <span className="font-bold">
                    Total: ${product.totalPrice}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full bg-indigo-500 w-6 h-6 text-white flex items-center justify-center text-sm"
                    onClick={() => handleRemoveItem(product)}
                  >
                    -
                  </button>
                  <span className="text-sm">{product.qty}</span>
                  <button
                    type="button"
                    className="rounded-full bg-indigo-500 w-6 h-6 text-white flex items-center justify-center text-sm"
                    onClick={() => handleClickBuy(product)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleHideModalCart}
            className="rounded-full border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>
          <button
            type="button"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
            onClick={handleCheckoutWhatsapp}
          >
            Checkout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
