import axios from "axios"
import { addShippingAddress, setError, setExpressShipping, clearCart, clearOrder } from "../slices/order"

export const setShippingAddress = (address) => dispatch => {
    dispatch(addShippingAddress(address))
}

export const setShippingAddressError = (error) => dispatch => {
    dispatch(setError(error))
}

export const createOrder = (order) => async (dispatch, getState) => {
    const token = JSON.parse(localStorage.getItem("techCommerceUser")).token
    const {
        order: { shippingAddress }
    } = getState()

    const preparedOrder = { ...order, shippingDetails: shippingAddress }
    try {
        const { data } = await axios.post("https://techommerce-backend.onrender.com/order", preparedOrder, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const resetOrder = () => (dispatch) => {
    dispatch(clearOrder())
}
