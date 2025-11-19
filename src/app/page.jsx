"use client";
import ProductList from "@/features/productList/ProductList";
import { useState } from "react";

export default function Home() {
  return (
    <div className="w-full bg-sky-50">
      <main className="mt-4 max-w-7xl mx-auto px-4">
        <ProductList />
      </main>
    </div>
  );
}
