import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null
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
        },
        setRegister: (state) => {
            state.loading = false;
            state.error = null;
        },
        setLogout: (state) => {
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

export const { setLoading, setError, setLogin, setLogout, setRegister } = userSlice.actions
export default userSlice.reducer
export const userSelector = (state) => state.user;