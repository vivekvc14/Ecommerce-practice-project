import {
  setError,
  setLoading,
  setProducts,
  setProduct,
  productReviewed,
  resetError,
  deleteReview,
} from "../slices/products";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get("https://techommerce-backend.onrender.com/product");
    dispatch(setProducts(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Something went wrong, please try again!"
      )
    );
  }
};

export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get("https://techommerce-backend.onrender.com/product/" + id);
    dispatch(setProduct(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "Something went wrong, please try again!"
      )
    );
  }
};

export const createReview =
  (productId, userId, title, comment, rating) => async (dispatch) => {
    dispatch(setLoading());
    const user = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const { data } = await axios.post(
        `https://techommerce-backend.onrender.com/product/review/${productId}`,
        { userId, title, comment, rating },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(productReviewed(data));
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

export const resetProductError = () => (dispatch) => {
  dispatch(resetError());
};

export const deleteReviewAction = (productId, reviewId) => async (dispatch) => {
  dispatch(setLoading());
  const user = JSON.parse(localStorage.getItem("userInfo"));
  try {
    const { data } = await axios.delete(
      `https://techommerce-backend.onrender.com/product/review-delete/${productId}/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    dispatch(deleteReview(data));
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
