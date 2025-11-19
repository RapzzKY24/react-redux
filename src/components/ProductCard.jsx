// "use client"; // Kalau pakai Next.js App Router dan ProductCard ini client component

import { addItemToCart } from "@/features/cart/cartSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Eye } from "lucide-react";

export default function ProductCard({ item, onShowDetail }) {
  const dispatch = useDispatch();

  const handleClickBuy = (product) => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="w-full bg-white/50 rounded-xl border shadow p-4 relative">
      {" "}
      <button
        onClick={() => onShowDetail(item.id)}
        className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 z-10"
        aria-label="View product details"
      >
        <Eye className="text-gray-700 text-lg" />
      </button>
      <div className="group relative w-[80%] h-[300px] mx-auto overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain group-hover:scale-110 transition-all duration-500 ease-in-out"
        />
      </div>
      <div className="flex flex-col gap-6 mt-8">
        <button
          type="button"
          className="bg-indigo-700 text-sm rounded-lg hover:bg-indigo-800 text-white px-8 py-3"
          onClick={() => handleClickBuy(item)}
        >
          BUY NOW
        </button>
        <h3 className="font-bold">{item.title}</h3>
        <h3>${item.price}</h3>
      </div>
    </div>
  );
}
