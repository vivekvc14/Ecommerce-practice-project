import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    products: []
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setLoading: state => {
            state.loading = true
        },
        setProducts: (state, { payload }) => {
            state.loading = false;
            state.products = payload;
            state.error = null;
        },
        setError: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    }
})

export const { setLoading, setError, setProducts } = productsSlice.actions
export default productsSlice.reducer
export const productSelector = (state) => state.products;