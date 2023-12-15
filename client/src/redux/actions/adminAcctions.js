import {
  deleteOneUser,
  getAllUsers,
  resetError,
  setError,
  setLoading,
  getOrders,
  deleteUserOrder,
  setDelivered,
  getReviews,
} from "../slices/admin";
import axios from "axios";
import {
  setProductUpdate,
  setProducts,
  setReviewRemovalFlag,
} from "../slices/products";

export const getUsers = () => async (dispatch) => {
  dispatch(setLoading());
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  try {
    const { data } = await axios.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAllUsers(data));
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

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(setLoading());
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  try {
    await axios.delete(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteOneUser());
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

export const getAllOrders = () => async (dispatch) => {
  dispatch(setLoading());
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  try {
    const { data } = await axios.get("/order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getOrders(data));
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

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch(setLoading());
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  try {
    await axios.delete(`/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteUserOrder());
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

export const setOrderDelivered = (orderId) => async (dispatch) => {
  dispatch(setLoading());
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  try {
    await axios.put(
      `/order/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setDelivered());
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

export const createProduct = (productData) => async (dispatch) => {
  dispatch(setLoading());

  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  try {
    const { data } = await axios.post(`/product`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setProducts(data));
    dispatch(resetError());
    dispatch(setProductUpdate());
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

export const updateProduct =
  (productData, productId) => async (dispatch, getState) => {
    dispatch(setLoading());
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
      const { data } = await axios.put(`/product/${productId}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setProducts(data));
      dispatch(resetError());
      dispatch(setProductUpdate());
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

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(setLoading());
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  try {
    await axios.delete(`/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(resetError());
    dispatch(setProductUpdate());
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

export const removeReview = (productId, reviewId) => async (dispatch) => {
  dispatch(setLoading());
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  try {
    await axios.delete(`/product/${productId}/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setReviewRemovalFlag());
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

export const getReviewsAction = () => async (dispatch) => {
  dispatch(setLoading());
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  try {
    const { data } = await axios.get(`/product/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getReviews(data));
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

export const resetErrorAndRemoval = () => (dispatch) => {
  dispatch(resetError());
};
