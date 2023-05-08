import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    products: [],
    product: null,
    productReviewed: false,
    productUpdate: false
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
        setProduct: (state, { payload }) => {
            state.loading = false;
            state.product = payload;
            state.error = null;
        },
        setError: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        productReviewed: (state) => {
            state.loading = false;
            state.error = null;
            state.productReviewed = true;
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
        }
    }
})

export const { setLoading, setError, setProducts, setProduct, productReviewed, resetError, setProductUpdate } = productsSlice.actions
export default productsSlice.reducer
export const productSelector = (state) => state.products;