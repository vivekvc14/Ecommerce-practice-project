import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  userList: [],
  userRemoval: false,
  orders: null,
  orderDelivered: false,
  orderRemoval: false,
  reviewList: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    getAllUsers: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.userList = payload;
    },
    deleteOneUser: (state) => {
      state.loading = false;
      state.error = null;
      state.userRemoval = true;
    },
    getOrders: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.orders = payload;
    },
    deleteUserOrder: (state) => {
      state.loading = false;
      state.error = null;
      state.orderRemoval = true;
    },
    setDelivered: (state) => {
      state.loading = false;
      state.error = null;
      state.orderDelivered = true;
    },
    getReviews: (state, { payload }) => {
      state.loading = false;
      state.reviewList = payload;
    },
    resetError: (state) => {
      state.loading = false;
      state.error = null;
      state.userRemoval = false;
      state.orderDelivered = false;
      state.orderRemoval = false;
    },
  },
});

export const {
  setLoading,
  setError,
  deleteOneUser,
  getAllUsers,
  resetError,
  getOrders,
  deleteUserOrder,
  setDelivered,
  getReviews,
} = adminSlice.actions;
export default adminSlice.reducer;
export const adminSelector = (state) => state.admin;
