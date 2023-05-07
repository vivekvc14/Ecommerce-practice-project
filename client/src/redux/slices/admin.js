import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    userList: [],
    userRemoval: false
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setLoading: state => {
            state.loading = true
        },
        setError: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        getAllUsers: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.userList = payload
        },
        deleteOneUser: (state) => {
            state.loading = false;
            state.error = null;
            state.userRemoval = true;
        },
        resetError: (state) => {
            state.loading = false;
            state.error = null;
            state.userRemoval = false;
        }
    }
})

export const { setLoading, setError, deleteOneUser, getAllUsers, resetError } = adminSlice.actions
export default adminSlice.reducer
export const adminSelector = (state) => state.admin;
