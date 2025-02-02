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
  resetLogin,
} from "../slices/user";
import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.post(
      "https://techommerce-backend.onrender.com/user/login",
      {
        email,
        password,
      }
    );
    dispatch(setLogin(data));
    localStorage.setItem("techCommerceUser", JSON.stringify(data));
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
  localStorage.removeItem("techCommerceUser");
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.post("https://techommerce-backend.onrender.com/user/register", {
      name,
      email,
      password,
    });
    dispatch(setRegister());
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
        `https://techommerce-backend.onrender.com/user/profile/${id}`,
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("techCommerceUser")).token
            }`,
          },
        }
      );

      localStorage.setItem("techCommerceUser", JSON.stringify(data));
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
  const user = JSON.parse(localStorage.getItem("techCommerceUser"));
  try {
    const { data } = await axios.get(
      `https://techommerce-backend.onrender.com/order/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
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
  const user = JSON.parse(localStorage.getItem("techCommerceUser"));
  try {
    await axios.delete(
      `https://techommerce-backend.onrender.com/user/user-delete/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
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

export const resetLoginAction = () => (dispatch) => {
  dispatch(resetLogin());
};
