import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem("techCommerceUser")) ?? null,
  updateSuccess: false,
  orders: [],
  accountDeleted: false,
  validRegister: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setLogin: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.error = null;
      state.updateSuccess = false;
      state.accountDeleted = false;
      state.validRegister = false;
    },
    setRegister: (state) => {
      state.loading = false;
      state.error = null;
      state.accountDeleted = false;
      state.validRegister = true;
    },
    updateUserProfile: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
      state.updateSuccess = true;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
      state.loading = false;
      state.error = null;
      state.validRegister = false;
    },
    setLogout: (state) => {
      state.updateSuccess = false;
      state.loading = false;
      state.userInfo = null;
      state.error = null;
      state.validRegister = false;
    },
    setUserOrders: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.orders = payload;
    },
    setDeleteAccount: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.accountDeleted = true;
      state.validRegister = false;
      localStorage.removeItem("techCommerceUser");
    },
    resetLogin: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.validRegister = false;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.validRegister = false;
      state.error = payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setLogin,
  setLogout,
  setRegister,
  updateUserProfile,
  resetUpdate,
  setUserOrders,
  setDeleteAccount,
  resetLogin,
} = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state) => state.user;
