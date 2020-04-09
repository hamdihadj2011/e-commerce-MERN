import {
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SELL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCT_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    ADD_BRAND,
    ADD_WOOD,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
  } from "../actions/types";
  
  export default function(state = {}, action) {
    const { payload, type } = action;
    switch (type) {
      case GET_PRODUCTS_BY_ARRIVAL:
        return {
          ...state,
          byArrivall:payload
        };
      case GET_PRODUCTS_BY_SELL:
        return {
          ...state,
          bySell:payload
        };
        case GET_PRODUCT_DETAIL:
          
        return {
          ...state,
          productDetail:payload
        };
       case GET_BRANDS:
         return {
           ...state,
           brands:payload
         } 
        case GET_WOODS:
          return {
            ...state,
            woods:payload
          }
        case GET_PRODUCT_TO_SHOP:
          return {
            ...state,
            toShop:payload.articles,
            toShopSize:payload.size
          }
        case ADD_PRODUCT:
          return {
            ...state,
            addProduct:payload
          }
        case CLEAR_PRODUCT:
          return {
            ...state,
            addProduct:payload
          }
          case CLEAR_PRODUCT_DETAIL:
          return {
            ...state,
            productDetail:payload
          }
          case ADD_BRAND:
            return {
              ...state,
              addBrand:payload.success,
              brands:payload.brands
            }
            case ADD_WOOD:
            return {
              ...state,
              addWood:payload.success,
              woods:payload.woods
            }
      default:
        return state;
    }
  }
  