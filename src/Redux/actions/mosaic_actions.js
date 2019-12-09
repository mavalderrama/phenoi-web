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

export function openUploadShapeForm(mosaic_id) {
  return {
    type: "OPEN_UPLOAD_SHAPE_FORM",
    payload: { mosaic_opened: mosaic_id }
  };
}

export function closeUploadShapeForm() {
  return {
    type: "CLOSE_UPLOAD_SHAPE_FORM"
  };
}

export function uploadShapeFiles(field, plot, panel, mosaic_id) {
  const formData = new FormData();
  if (field != null) formData.append("field", field[0]);
  if (plot != null) formData.append("plot", plot[0]);
  if (panel != null) formData.append("panel", panel[0]);
  formData.append("mosaic_id", mosaic_id);
  return {
    type: "UPLOAD_SHAPE_FILE",
    payload: axios.post(
      `${constants.API_URI}/upload_shape`,
      formData,
      axiosConfigFile
    )
  };
}

export function performTimeSeries(vectorId) {
  return {
    type: "PERFORM_TIMESERIES",
    payload: axios.post(
      `${constants.API_URI}/timeseries`,
      { mosaics: vectorId },
      axiosConfig
    )
  };
}

export function createMosaic(
  combo,
  stage,
  image,
  calibrated,
  project_opened,
  date,
  name
) {
  const formData = new FormData();
  formData.append("project", project_opened);
  formData.append("type", combo);
  formData.append("stage", stage);
  formData.append("date", date);
  formData.append("calibrated", calibrated);
  formData.append("mosaic", image[0]);
  formData.append("name", name);
  formData.append("user_id", sessionStorage.getItem("id"));
  console.log("form", date);
  return {
    type: "CREATE_MOSAIC",
    payload: axios.post(
      `${constants.API_URI}/upload_mosaic`,
      formData,
      axiosConfigFile
    )
  };
}

export function closeFormAddMosaic() {
  return {
    type: "CLOSE_ADD_MOSAIC_FORM"
  };
}
