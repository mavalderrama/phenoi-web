import axios from "axios";
import constants from "./../../Redux/constants";

const axiosConfig = {
  headers: {
    "content-Type": "application/json"
    // Accept: "*/*"
  },
  withCredentials: false
};

const axiosConfigFile = {
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: false
};

export function openUploadShapeForm() {
  return {
    type: "OPEN_UPLOAD_SHAPE_FORM"
  };
}

export function closeUploadShapeForm() {
  return {
    type: "CLOSE_UPLOAD_SHAPE_FORM"
  };
}
