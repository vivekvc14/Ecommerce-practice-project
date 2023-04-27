import { createSlice } from "@reduxjs/toolkit"

const calculateSubTotal = (cart) => {
    let total = 0;
    cart.map(item => {
        total += item.price * item.qty
    })
    return total;
}

const initialState = {
    loading: false,
    error: null,
    cart: JSON.parse(localStorage.getItem("cartItems")) || [],
    subTotal: JSON.parse(localStorage.getItem("subTotal")) || 0,
    expressShipping: false
}

const updateLocalStorage = (cart, subTotal) => {
    localStorage.setItem("cartItems", JSON.stringify(cart))
    localStorage.setItem("subTotal", JSON.stringify(subTotal))
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setLoading: state => {
            state.loading = true
        },
        addCartItem: (state, { payload }) => {
            const existingItem = state.cart.find(item => item.id === payload.id)
            if (existingItem) {
                state.cart = state.cart.map(item => (item.id === existingItem.id ? payload : item))
            } else {
                state.cart = [...state.cart, payload]
            }
            state.subTotal = calculateSubTotal(state.cart)
            updateLocalStorage(state.cart, state.subTotal)
            state.loading = false;
            state.error = null;
        },
        cartItemRemoval: (state, { payload }) => {
            state.cart = state.cart.filter(item => item.id !== payload)
            calculateSubTotal(state.cart)
            updateLocalStorage(state.cart, state.subTotal)
            state.loading = false;
            state.error = null;
        },
        setError: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    }
})

export const { setLoading, setError, addCartItem, cartItemRemoval } = cartSlice.actions
export default cartSlice.reducer
export const cartSelector = (state) => state.cart;