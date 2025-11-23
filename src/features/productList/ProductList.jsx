"use client"

import ProductCard from "@/components/ProductCard"
import React, { useEffect, useState } from "react"
import { Oval } from "react-loader-spinner"
import { useDispatch, useSelector } from "react-redux"
import {
  selectAllCategories,
  selectFilteredProducts,
  selectCurrentCategory,
  selectCurrentSort,
  setProducts,
  setCategory,
  setSortOrder,
  setCurrentSearch,
  selectCurrentSearch,
  selectWishlistIds,
  setWhislistItem,
} from "./productSlice"
import { SearchIcon } from "lucide-react"
import ProductModalContent from "./ProductModal"
import Modal from "@/components/Modal"

const ProductList = () => {
  const [isLoading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)

  const dispatch = useDispatch()

  const productsToRender = useSelector(selectFilteredProducts)
  const categories = useSelector(selectAllCategories)
  const currentCategory = useSelector(selectCurrentCategory)
  const currentSort = useSelector(selectCurrentSort)
  const currentSearch = useSelector(selectCurrentSearch)
  const wishlistIds = useSelector(selectWishlistIds)

  const [keyword, setKeyword] = useState("")

  const handleIsWhislist = (id) => {
    console.log("Clicked wishlist for id: ", id)
    console.log("Current wishlist ids: ", wishlistIds)
    dispatch(setWhislistItem(id))
  }

  const handleShowDetail = (id) => {
    setSelectedProductId(id)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProductId(null)
  }

  console.log("current search: ", currentSearch)

  const handleSearchChange = (e) => {
    const value = e.target.value
    setKeyword(value)
    dispatch(setCurrentSearch(value))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setCurrentSearch(keyword))
  }

  useEffect(() => {
    const fetchProducts = async () => {
      if (productsToRender.length > 0) return

      setLoading(true)
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        const responseJson = await response.json()
        dispatch(setProducts(responseJson))
      } catch (error) {
        console.log("Error: ", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [dispatch, productsToRender.length])

  const handleSortChange = (e) => {
    dispatch(setSortOrder(e.target.value))
  }

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value))
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <Oval color="blue" />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* FILTER BAR */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-500 mb-1">
                Category
              </label>
              <select
                value={currentCategory}
                onChange={handleCategoryChange}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              <label className="text-xs font-semibold text-slate-500 mb-1">
                Sort By
              </label>
              <select
                value={currentSort}
                onChange={handleSortChange}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="none">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-a-z">Name: A-Z</option>
                <option value="name-z-a">Name: Z-A</option>
              </select>
            </div>
          </div>

          <form onSubmit={handleSearch} className="w-full md:w-auto">
            <label className="text-xs font-semibold text-slate-500 mb-1 block">
              Search Product
            </label>
            <div className="relative w-full md:w-[320px] lg:w-[380px]">
              <SearchIcon
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 rounded-full border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Cari berdasarkan nama produk..."
                name="keyword"
                value={keyword}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {productsToRender.length > 0 ? (
            productsToRender.map((product) => (
              <ProductCard
                key={product.id}
                item={product}
                onShowDetail={handleShowDetail}
                onWhislist={handleIsWhislist}
                isWhislisted={wishlistIds.includes(product.id)} // <-- BOOL per product
              />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-500 mt-10 text-sm">
              No products found based on your filter.
            </div>
          )}
        </div>

        {/* MODAL DETAIL */}
        {showModal && selectedProductId && (
          <Modal onClose={handleCloseModal}>
            <ProductModalContent
              productId={selectedProductId}
              onClose={handleCloseModal}
            />
          </Modal>
        )}
      </div>
    </div>
  )
}

export default ProductList
