import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  productReviewed: false,
  productUpdate: false,
  reviewRemoval: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
      state.error = null;
    },
    setProduct: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    productReviewed: (state) => {
      state.loading = false;
      state.error = null;
      state.productReviewed = true;
      state.reviewRemoval = false;
    },
    setProductUpdate: (state) => {
      state.loading = false;
      state.error = null;
      state.productUpdate = true;
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.productReviewed = false;
      state.productUpdate = false;
      state.reviewRemoval = false;
    },
    setReviewRemovalFlag: (state) => {
      state.loading = false;
      state.reviewRemoval = true;
      state.error = false;
    },
    deleteReview: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
      state.reviewRemoval = true;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setProduct,
  productReviewed,
  resetError,
  setProductUpdate,
  setReviewRemovalFlag,
  deleteReview,
} = productsSlice.actions;
export default productsSlice.reducer;
export const productSelector = (state) => state.products;
