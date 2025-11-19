"use client"; // WAJIB karena pakai hooks & App Router

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentProduct, setProducts } from "./productSlice";
import Image from "next/image";

const ProductModalContent = ({ productId, onClose }) => {
  const dispatch = useDispatch();

  const hasProducts = useSelector((state) => state.product.items.length > 0);

  const currentProduct = useSelector((state) =>
    selectCurrentProduct(state, Number(productId))
  );

  useEffect(() => {
    if (!hasProducts) {
      const fetchAllProducts = async () => {
        try {
          const response = await fetch("https://fakestoreapi.com/products");
          const responseJson = await response.json();
          dispatch(setProducts(responseJson));
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchAllProducts();
    }
  }, [dispatch, hasProducts]);

  if (!productId) {
    return (
      <div className="p-10 text-center text-red-500">
        ID Produk tidak valid.
      </div>
    );
  }

  if (!hasProducts) {
    return (
      <div className="p-10 text-center text-gray-500">
        Sedang memuat data produk...
      </div>
    );
  }

  if (hasProducts && !currentProduct) {
    return (
      <div className="p-10 text-center text-red-500">
        Produk tidak ditemukan bro!
      </div>
    );
  }

  const { title, image, description, price, category, rating } = currentProduct;
  const rate = rating?.rate ?? "-";
  const count = rating?.count ?? 0;

  return (
    <div className="relative max-w-2xl w-full mx-auto rounded-2xl bg-white shadow-2xl border border-slate-100 p-5 md:p-6">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-sm font-bold hover:bg-slate-200 hover:text-slate-700 transition"
        aria-label="Close modal"
      >
        ✕
      </button>

      <div className="flex flex-col gap-2 mb-4">
        <span className="inline-flex w-fit items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 uppercase tracking-wide">
          {category}
        </span>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 leading-snug">
          {title}
        </h1>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-[1.1fr,1.4fr] items-start">
        <div className="flex justify-center">
          <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 160px, 224px"
              className="object-contain p-4"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              <span className="text-base">⭐</span>
              <span className="font-semibold">{rate}</span>
              {count > 0 && (
                <span className="text-xs text-amber-700/80">
                  ({count} reviews)
                </span>
              )}
            </div>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <span className="text-xs sm:text-sm text-slate-500">
              FakeStore Exclusive
            </span>
          </div>

          <p className="text-sm md:text-[0.9rem] text-slate-600 leading-relaxed max-h-32 md:max-h-40 overflow-y-auto pr-1">
            {description}
          </p>

          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                Price
              </span>
              <span className="text-2xl font-bold text-emerald-600">
                ${price}
              </span>
            </div>

            <button className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-indigo-700 active:scale-[0.98] transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModalContent;
