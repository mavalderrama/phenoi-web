import axios from "axios";
import constants from "./../../Redux/constants";

const axiosConfig = {
  headers: {
    "content-Type": "application/json"
    // Accept: "*/*"
  },
  withCredentials: true
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
  return {
    type: "GET_PROJECTS",
    payload: axios.post(`${constants.API_URI}/projects`, {}, axiosConfig)
  };
}

export function getMosaics(projectName) {
  return {
    type: "GET_MOSAICS",
    payload: axios.post(
      `${constants.API_URI}/mosaics`,
      { project_name: projectName },
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
  return {
    type: "CREATE_PROJECT",
    payload: axios.post(
      `${constants.API_URI}/add_project`,
      { details: details, project_name: project_name },
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
  date
) {
  const formData = new FormData();
  formData.append("project", project_opened);
  formData.append();
  formData.append();
  formData.append();
  formData.append();
  formData.append();
  return {
    type: "CREATE_MOSAIC",
    payload: axios.post(
      `${constants.API_URI}/upload_mosaic`,
      formData,
      axiosConfig
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
