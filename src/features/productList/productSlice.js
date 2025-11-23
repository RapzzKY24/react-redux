import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filteredItems: [],
  currentCategory: "",
  currentSort: "none",
  currentSearch: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },

    setCategory: (state, action) => {
      state.currentCategory = action.payload;
      applyFilterAndSort(state);
    },

    setSortOrder: (state, action) => {
      state.currentSort = action.payload;
      applyFilterAndSort(state);
    },
    setCurrentSearch: (state, action) => {
      state.currentSearch = action.payload;
      applyFilterAndSort(state);
    },
  },
});

const applyFilterAndSort = (state) => {
  let tempItems = [...state.items];

  if (state.currentCategory && state.currentCategory !== "") {
    tempItems = tempItems.filter(
      (product) => product.category === state.currentCategory
    );
  }

  if (state.currentSearch && state.currentSearch.trim() !== "") {
    const search = state.currentSearch.trim().toLowerCase();

    tempItems = tempItems.filter((product) =>
      product.title.toLowerCase().includes(search)
    );
  }

  switch (state.currentSort) {
    case "price-asc":
      tempItems.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      tempItems.sort((a, b) => b.price - a.price);
      break;
    case "name-a-z":
      tempItems.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-z-a":
      tempItems.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      break;
  }

  state.filteredItems = tempItems;
};

export const selectFilteredProducts = (state) => state.product.filteredItems;

export const selectCurrentProduct = (state, productId) =>
  state.product.items.find((product) => product.id === productId);

export const selectAllCategories = (state) => {
  return [...new Set(state.product.items.map((product) => product.category))];
};

export const selectCurrentCategory = (state) => state.product.currentCategory;
export const selectCurrentSort = (state) => state.product.currentSort;
export const selectCurrentSearch = (state) => state.product.currentSearch;

export const { setProducts, setCategory, setSortOrder, setCurrentSearch } =
  productSlice.actions;
export default productSlice.reducer;
