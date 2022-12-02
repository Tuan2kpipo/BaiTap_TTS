import axios from "axios";
import * as Types from "../types";

const BASE_URL_USER = "https://fakestoreapi.com";

export const getAllUser = () => async (dispatch) => {
  try {
    const result = await axios.get(`${BASE_URL_USER}/users`);
    dispatch({ type: Types.GET_ALL_UER, payload: result.data });
    console.log("tat ca thong tin user actions", result);
  } catch (error) {
    console.log("get api error: ", error);
  }
};

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${BASE_URL_USER}/users/${id}`)
      .then((res) => {
        console.log("xoa thanh cong", res);
        dispatch({ type: Types.DELETE_USER, payload: res.data.id });
      })
      .catch((error) => console.log("error", error));
  };
};

export const updateUserr = (user, id) => {
  return function (dispatch) {
    axios
      .put(`${BASE_URL_USER}/users/${id}`, user)
      .then((res) => {
        console.log("sua thnah cong", res);
        dispatch({ type: Types.UPDATE_USER, payload: res.data });
      })
      .catch((error) => console.log("error", error));
  };
};

export const getSingUser = (id) => {
  return function (dispatch) {
    axios
      .get(`${BASE_URL_USER}/users/${id}`)
      .then((res) => {
        console.log("lay ra thong tin 1 user", res);
        dispatch({ type: Types.GET_USER, payload: res.data });
      })
      .catch((error) => console.log("error", error));
  };
};

export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(`${BASE_URL_USER}/users`, user)
      .then((res) => {
        console.log("them thanh cong api user", res);
        dispatch({ type: Types.ADD_USER, payload: { ...res.data, ...user } });
      })
      .catch((error) => console.log("error", error));
  };
};
