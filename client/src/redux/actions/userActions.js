import { resetUpdate, setError, setLoading, setLogin, setLogout, setRegister, updateUserProfile } from "../slices/user";
import axios from "axios"
export const login = (email, password) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data } = await axios.post("/user/login", { email, password })
        dispatch(setLogin(data))
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        console.log(error.response)
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const logout = () => (dispatch) => {
    dispatch(setLogout())
    localStorage.removeItem("userInfo")
}

export const register = (name, email, password) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        dispatch(setRegister())
        await axios.post("/user/register", { name, email, password })
    } catch (error) {
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const updateProfile = (id, name, email, password) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const { data } = await axios.put(`/user/profile/${id}`, { name, email, password }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
            }
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
        dispatch(updateUserProfile(data))
    } catch (error) {
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}

export const resetUpdateSuccess = () => dispatch => {
    dispatch(resetUpdate())
}