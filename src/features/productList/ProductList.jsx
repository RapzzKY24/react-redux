"use client";
import ProductCard from "@/components/ProductCard";

import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const responseJson = await response.json();
        setProducts(responseJson);
        console.log("Data products : ", responseJson);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 py-4">
          {products.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
