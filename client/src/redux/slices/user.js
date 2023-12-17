import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
  updateSuccess: false,
  orders: [],
  accountDeleted: false,
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
    },
    setRegister: (state) => {
      state.loading = false;
      state.error = null;
      state.accountDeleted = false;
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
    },
    setLogout: (state) => {
      state.updateSuccess = false;
      state.loading = false;
      state.userInfo = null;
      state.error = null;
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
      localStorage.removeItem("userInfo");
    },
    setError: (state, { payload }) => {
      state.loading = false;
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
} = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state) => state.user;
