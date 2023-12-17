import {
  resetUpdate,
  setError,
  setLoading,
  setLogin,
  setLogout,
  setRegister,
  updateUserProfile,
  setUserOrders,
  setDeleteAccount,
} from "../slices/user";
import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.post("http://localhost:5000/user/login", {
      email,
      password,
    });
    dispatch(setLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      setError(
        error.response
          ? error.response.data
          : error.message
          ? error.message
          : "Something went wrong, please try again!"
      )
    );
  }
};

export const logout = () => (dispatch) => {
  dispatch(setLogout());
  localStorage.removeItem("userInfo");
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    dispatch(setRegister());
    await axios.post("http://localhost:5000/user/register", {
      name,
      email,
      password,
    });
  } catch (error) {
    dispatch(
      setError(
        error.response
          ? error.response.data
          : error.message
          ? error.message
          : "Something went wrong, please try again!"
      )
    );
  }
};

export const updateProfile =
  (id, name, email, password) => async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await axios.put(
        `http://localhost:5000/user/profile/${id}`,
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userInfo")).token
            }`,
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(updateUserProfile(data));
    } catch (error) {
      dispatch(
        setError(
          error.response
            ? error.response.data
            : error.message
            ? error.message
            : "Something went wrong, please try again!"
        )
      );
    }
  };

export const resetUpdateSuccess = () => (dispatch) => {
  dispatch(resetUpdate());
};

export const getUserOrders = () => async (dispatch) => {
  dispatch(setLoading());
  const user = JSON.parse(localStorage.getItem("userInfo"));
  try {
    const { data } = await axios.get(`http://localhost:5000/order/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(setUserOrders(data));
  } catch (error) {
    dispatch(
      setError(
        error.response
          ? error.response.data
          : error.message
          ? error.message
          : "Something went wrong, please try again!"
      )
    );
  }
};

export const deleteUserAction = (userId) => async (dispatch) => {
  dispatch(setLoading());
  const user = JSON.parse(localStorage.getItem("userInfo"));
  try {
    await axios.delete(`http://localhost:5000/user/user-delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(setDeleteAccount());
  } catch (error) {
    dispatch(
      setError(
        error.response
          ? error.response.data
          : error.message
          ? error.message
          : "Something went wrong, please try again!"
      )
    );
  }
};
