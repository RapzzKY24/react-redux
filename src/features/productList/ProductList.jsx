"use client";
import ProductCard from "@/components/ProductCard";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCategories,
  selectFilteredProducts,
  selectCurrentCategory,
  selectCurrentSort,
  setProducts,
  setCategory,
  setSortOrder,
} from "./productSlice";

const ProductList = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const productsToRender = useSelector(selectFilteredProducts);
  const categories = useSelector(selectAllCategories);

  const currentCategory = useSelector(selectCurrentCategory);
  const currentSort = useSelector(selectCurrentSort);

  useEffect(() => {
    const fetchProducts = async () => {
      if (productsToRender.length > 0 && !isLoading) return;

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

  const handleSortChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <Oval color="blue" />
      </div>
    );
  }

  return (
    <div className="w-full h-full py-4">
      <div className="mb-6 flex flex-wrap items-center gap-4 px-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 mb-1">
            Category
          </label>
          <select
            value={currentCategory}
            onChange={handleCategoryChange}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 mb-1">
            Sort By
          </label>
          <select
            value={currentSort}
            onChange={handleSortChange}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="none">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-a-z">Name: A-Z</option>
            <option value="name-z-a">Name: Z-A</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {productsToRender.length > 0 ? (
          productsToRender.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-10">
            No products found based on your filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
