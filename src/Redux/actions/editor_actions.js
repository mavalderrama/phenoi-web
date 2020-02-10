import axios from "axios";
import constants from "./../../Redux/constants";

const axiosConfig = {
  headers: {
    "content-Type": "application/json"
  },
  withCredentials: false
};

const axiosConfigFile = {
  headers: {
    "Content-Type": "multipart/form-data"
  },
  withCredentials: false
};

const axiosConfigBlob = {
  headers: {
    // "content-Type": "application/json"
    // "Content-Disposition": "attachment;filename=capsule.zip",
    Accept: "application/zip"
  },
  responseType: "image/jpeg"
};

export function calibrate(mosaic_id) {
  console.log("ready to calibrate", mosaic_id);
  return {
    type: "CALIBRATE_MOSAIC",
    payload: axios.post(
      `${constants.API_URI}/calibrate`,
      { mosaic_id: mosaic_id },
      axiosConfig
    )
  };
}

export function loading(state) {
  return {
    type: "LOADING",
    payload: state
  };
}

// export function getMosaic(mosaic_id, param) {
//   let vi = param;
//   return {
//     type: "GET_MOSAIC",
//     payload: axios.get(
//       `${constants.API_URI}/get_mosaic/${mosaic_id}?vi=${param}`
//     )
//   };
// }

export function getMosaicData(mosaic_id) {
  return {
    type: "GET_MOSAIC_DATA",
    payload: axios.post(
      `${constants.API_URI}/get_mosaic/${mosaic_id}`,
      axiosConfig
    )
  };
}

export function getFeatures(mosaic_id) {
  return {
    type: "GET_FEATURES",
    payload: axios.post(
      `${constants.API_URI}/get_features`,
      { mosaic_id: mosaic_id },
      axiosConfig
    )
  };
}
