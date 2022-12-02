import axios from "axios";
import * as Types from "../types";

const BASE_URL_USER = "https://fakestoreapi.com";

// lay tat ca user
export const getAllUser = () => async (dispatch) => {
  try {
    const result = await axios.get(`${BASE_URL_USER}/users`);
    dispatch({ type: Types.GET_ALL_UER, payload: result.data });
    console.log("tat ca thong tin user actions", result);
  } catch (error) {
    console.log("get api error: ", error);
  }
};

// xoa user
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

// cap nhat user
export const updateUserr = (user, id) => {
  return function (dispatch) {
    axios
      .put(`${BASE_URL_USER}/users/${id}`, user)
      .then((res) => {
        console.log("sua thnah cong", res.data);

        console.log("lay ra thong tin 1 user", { ...res.data, id });

        dispatch({ type: Types.UPDATE_USER, payload: { ...res.data, id } });
      })
      .catch((error) => console.log("error", error));
  };
};

// lay dl 1 ng dung theo id
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

// them user
export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(`${BASE_URL_USER}/users`, user)
      .then((res) => {
        console.log("them thanh cong api user", { ...res.data, ...user });
        dispatch({ type: Types.ADD_USER, payload: { ...res.data, ...user } });
      })
      .catch((error) => console.log("error", error));
  };
};
