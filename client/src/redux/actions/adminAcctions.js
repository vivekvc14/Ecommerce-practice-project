import { deleteOneUser, getAllUsers, resetError, setError, setLoading, getOrders, deleteUserOrder, setDelivered } from "../slices/admin";
import axios from "axios"

export const getUsers = () => async (dispatch) => {
    dispatch(setLoading())
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
        const { data } = await axios.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(getAllUsers(data))
    } catch (error) {
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    dispatch(setLoading())
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
        await axios.delete(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(deleteOneUser())
    } catch (error) {
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const getAllOrders = () => async (dispatch) => {
    dispatch(setLoading())
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
        const { data } = await axios.get("/order", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(getOrders(data))
    } catch (error) {
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch(setLoading())
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
        await axios.delete(`/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(deleteUserOrder())
    } catch (error) {
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const setOrderDelivered = (orderId) => async (dispatch) => {
    dispatch(setLoading())
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
        await axios.put(`/order/${orderId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(setDelivered())
    } catch (error) {
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const resetErrorAndRemoval = () => (dispatch) => {
    dispatch(resetError())
}