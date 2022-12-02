import * as Types from "../types";

const reducerInitialState = {
  allProducts: null,
  product: null,
  userLogin: null,
  getSearch: null,
};

const reducer = (state = reducerInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ALL:
      return { ...state, allProducts: payload };

    case Types.GET_PRODUCT:
      return { ...state, product: action.payload };

    case Types.DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter((e) => e.id !== action.payload),
      };

    case Types.ADD_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, payload],
      };

    case Types.UPDATE_PRODUCT:
      let listProducts = [...state.allProducts].map((item) => {
        var newObj;
        if (item.id === action.payload.id) {
          newObj = action.payload;
          return newObj;
        } else {
          return item;
        }
      });

      return {
        ...state,
        allProducts: listProducts,
      };

    case Types.LOGIN:
      return {
        ...state,
        userLogin: action.payload.token,
      };

    case Types.LOGOUT:
      return {
        ...state,
        userLogin: null,
      };

    case Types.GET_SEARCH:
      return {
        ...state,
        getSearch: payload,
      };

    default:
      return state;
  }
};

export default reducer;
