import { setError, setLoading, setProducts } from "../slices/products";
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