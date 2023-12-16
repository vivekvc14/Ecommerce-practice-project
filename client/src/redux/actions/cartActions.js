import { setError, setLoading, addCartItem as addItemToCart, cartItemRemoval, setExpressShipping, clearCart } from "../slices/cart";
import axios from "axios"

export const addCartItem = (id, qty) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data } = await axios.get(`http://localhost:5000/product/${id}`)
        const itemData = {
            id: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            stock: data.stock,
            qty
        }
        dispatch(addItemToCart(itemData))
    } catch (error) {
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const removeCartItem = (id) => async (dispatch) => {
    dispatch(cartItemRemoval(id))
}

export const addExpressShipping = (value) => (dispatch) => {
    dispatch(setExpressShipping(value))
}

export const resetCart = () => (dispatch) => {
    dispatch(clearCart())
}