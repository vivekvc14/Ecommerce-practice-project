import { createSlice } from "@reduxjs/toolkit"

const calculateSubTotal = (cart) => {
    let total = 0;
    cart.map(item =>
        total += item.price * item.qty
    )
    return total;
}

const initialState = {
    loading: false,
    error: null,
    cart: JSON.parse(localStorage.getItem("techCommerceUser")) || [],
    subTotal: JSON.parse(localStorage.getItem("techCommerceSubTotal")) || 0,
    expressShipping: JSON.parse(localStorage.getItem("techCommerceExpressShipping")) || false
}

const updateLocalStorage = (cart, subTotal) => {
    localStorage.setItem("techCommerceCartItems", JSON.stringify(cart))
    localStorage.setItem("techCommerceSubTotal", JSON.stringify(subTotal))
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
        setExpressShipping: (state, { payload }) => {
            state.expressShipping = payload;
            localStorage.setItem("techCommerceExpressShipping", JSON.stringify(payload))
        },
        clearCart: (state) => {
            localStorage.removeItem("techCommerceCartItems")
            state.cart = []
        }
    }
})

export const { setLoading, setError, addCartItem, cartItemRemoval, clearCart, setExpressShipping } = cartSlice.actions
export default cartSlice.reducer
export const cartSelector = (state) => state.cart;