import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    shippingAddress: null,
    order: null
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setLoading: state => {
            state.loading = true
        },
        addShippingAddress: (state, { payload }) => {
            state.loading = false
            state.error = null
            state.shippingAddress = payload
        },
        setError: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        clearOrder: (state) => {
            state.loading = initialState.loading;
            state.error = initialState.error;
            state.shippingAddress = initialState.shippingAddress;
            state.order = initialState.order
        }

    }
})

export const { setLoading, setError, addShippingAddress, clearOrder } = orderSlice.actions
export default orderSlice.reducer
export const orderSelector = (state) => state.order;