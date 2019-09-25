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

export function setOpen() {
  return {
    type: "OPEN",
    payload: { open: true }
  };
}

export function setClose() {
  return {
    type: "CLOSE",
    payload: { open: false }
  };
}

export function getProjects() {
  let user_id = sessionStorage.getItem("id");
  return {
    type: "GET_PROJECTS",
    payload: axios.post(
      `${constants.API_URI}/projects`,
      { user_id: user_id },
      axiosConfig
    )
  };
}

export function getMosaics(projectName) {
  let user_id = sessionStorage.getItem("id");
  return {
    type: "GET_MOSAICS",
    payload: axios.post(
      `${constants.API_URI}/mosaics`,
      { project_name: projectName, user_id: user_id },
      axiosConfig
    )
  };
}

export function closeProjects() {
  return {
    type: "CLOSE_PROJECTS"
  };
}

export function createProject(project_name, details) {
  let user_id = sessionStorage.getItem("id");
  return {
    type: "CREATE_PROJECT",
    payload: axios.post(
      `${constants.API_URI}/add_project`,
      { details: details, project_name: project_name, user_id: user_id },
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

export function openFormAddProject() {
  return {
    type: "OPEN_ADD_PROJECT_FORM"
  };
}

export function closeFormAddProject() {
  return {
    type: "CLOSE_ADD_PROJECT_FORM"
  };
}

export function closeFormAddMosaic() {
  return {
    type: "CLOSE_ADD_MOSAIC_FORM"
  };
}

export function openFormAddMosaic() {
  return {
    type: "OPEN_ADD_MOSAIC_FORM"
  };
}

export function refreshToProjects() {
  return {
    type: "REFRESH_TO_PROJECTS"
  };
}

export function openMosaic(name, stage, calibrated) {
  return {
    type: "OPEN_SELECTED_MOSAIC"
  };
}

export function deleteMosaic(id, project_name) {
  return {
    type: "DELETE_SELECTED_MOSAIC",
    payload: axios.post(
      `${constants.API_URI}/remove_mosaic`,
      { id: id, project_name: project_name },
      axiosConfig
    )
  };
}

export function deleteProject(id, project_name) {
  let user_id = sessionStorage.getItem("id");
  return {
    type: "DELETE_SELECTED_PROJECT",
    payload: axios.post(
      `${constants.API_URI}/remove_project`,
      { id: id, project_name: project_name, user_id: user_id },
      axiosConfig
    )
  };
}

export function openFormAddShape() {
  return {
    type: "OPEN_FORM_ADD_SHAPEFILE"
  };
}

export function pushBread(location) {
  return {
    type: "PUSH_BREAD",
    payload: location
  };
}

export function popBread(location) {
  return {
    type: "POP_BREAD",
    payload: location
  };
}
