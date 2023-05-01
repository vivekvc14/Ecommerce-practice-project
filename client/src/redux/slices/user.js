import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
    updateSuccess: false
}

const userSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setLoading: state => {
            state.loading = true
        },
        setLogin: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.error = null;
            state.updateSuccess = false;
        },
        setRegister: (state) => {
            state.loading = false;
            state.error = null;
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
        setError: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    }
})

export const { setLoading, setError, setLogin, setLogout, setRegister, updateUserProfile, resetUpdate } = userSlice.actions
export default userSlice.reducer
export const userSelector = (state) => state.user;