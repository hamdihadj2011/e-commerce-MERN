import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  UPDATE_DATA_USER,
  CLEAR_UPDATE_USER_DATA
} from "../actions/types";

export default function(state = {}, action) {
  const { payload, type } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: payload
      };
    case LOGOUT_USER:
      return {
        ...state
      };
    case REGISTER_USER:
      return {
        ...state,
        register: payload
      };
    case AUTH_USER:
      return {
        ...state,
        userData: payload
      };
    case ADD_TO_CART_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: payload
        }
      };
    case GET_CART_ITEMS_USER:
      return {
        ...state,
        cartDetail: payload
      };
    case REMOVE_CART_ITEM_USER:
      return {
        ...state,
        cartDetail: payload.cartDetail,
        userData: {
          ...state.userDate,
          cart: payload.cart
        }
      };
    case UPDATE_DATA_USER:
      return {
        ...state,
        updateUser:action.payload
      }

    case CLEAR_UPDATE_USER_DATA:
      return {
        ...state,
        updateUser:action.payload
      }

    default:
      return state;
  }
}
