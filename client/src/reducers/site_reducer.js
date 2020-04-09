import { UPDATE_SITE_DATA,GET_SITE_DATA } from "../actions/types";
export default function(state = {}, action) {
    const { payload, type } = action;
    switch (type) {
      case GET_SITE_DATA:
          return {
              ...state,
              siteData:payload
          }
      case UPDATE_SITE_DATA:
      return {
        ...state,
        siteData:payload.siteInfo
      }
      default:
        return state;
    }
  }