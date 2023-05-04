import { setError, setLoading, setProducts, setProduct, productReviewed, resetError } from "../slices/products";
import axios from "axios"

export const getProducts = () => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data } = await axios.get("/product")
        dispatch(setProducts(data))
    } catch (error) {
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const getProduct = (id) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data } = await axios.get("/product/" + id)
        dispatch(setProduct(data))
    } catch (error) {
        dispatch(setError(
            error.response && error.response.data.message ? error.response.data.message : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const createReview = (productId, userId, title, comment, rating) => async (dispatch) => {
    dispatch(setLoading())
    const user = JSON.parse(localStorage.getItem("userInfo"))
    try {
        const { data } = await axios.post(`/product/review/${productId}`, { userId, title, comment, rating }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        dispatch(productReviewed(data))
    } catch (error) {
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const resetProductError = () => (dispatch) => {
    dispatch(resetError())
}