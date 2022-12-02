import * as Types from "../types";

const reducerInitialState = {
  allUsers: null,
  user: null,
};

const user = (state = reducerInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ALL_UER:
      return { ...state, allUsers: payload };

    case Types.ADD_USER:
      return {
        ...state,
        allUsers: [...state.allUsers, payload],
      };

    case Types.GET_USER:
      return { ...state, user: action.payload };

    case Types.DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((e) => e.id !== action.payload),
      };

    case Types.UPDATE_USER:
      let listUser = [...state.allUsers].map((e) => {
        var newObj;
        if (e.id === action.payload.id) {
          newObj = action.payload;
          return newObj;
        } else {
          return e;
        }
      });

      return {
        ...state,
        allUsers: listUser,
      };

    default:
      return state;
  }
};

export default user;
