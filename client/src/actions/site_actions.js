import axios from "axios";

import { GET_SITE_DATA, UPDATE_SITE_DATA } from "./types";
import { SITE_SERVER } from "../utils/misk";

export function getSiteData() {
  const request = axios.get(`${SITE_SERVER}/site_data`).then((res) => res.data);

  return {
    type: GET_SITE_DATA,
    payload: request,
  };
}

export function updateSiteData(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/site_data`, dataToSubmit)
    .then((res) => res.data);

  return {
    type: UPDATE_SITE_DATA,
    payload: request,
  };
}
