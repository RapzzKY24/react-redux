"use client";
import ProductCard from "@/components/ProductCard";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorSortProductPriceAsc,
  selectorSortProductPriceDesc,
  selectProductItem,
  setProducts,
} from "./productSlice";

const ProductList = () => {
  const [isLoading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");

  const dispatch = useDispatch();
  const productItem = useSelector(selectProductItem);
  const productSortAsc = useSelector(selectorSortProductPriceAsc);
  const productSortDesc = useSelector(selectorSortProductPriceDesc);

  const productsToRender =
    sortOrder === "asc"
      ? productSortAsc
      : sortOrder === "desc"
      ? productSortDesc
      : productItem;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const responseJson = await response.json();
        dispatch(setProducts(responseJson));
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <Oval color="blue" />
      </div>
    );
  }

  return (
    <div className="w-full h-full py-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by price:</span>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="none">None</option>
          <option value="asc">Descending</option>
          <option value="desc">Ascending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productsToRender.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
