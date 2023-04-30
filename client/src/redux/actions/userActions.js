import { setError, setLoading, setLogin, setLogout, setRegister } from "../slices/user";
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
        console.log(error.response)
        dispatch(setError(
            error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        ))
    }
}