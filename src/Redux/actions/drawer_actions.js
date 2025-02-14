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

export function openAdminConsole() {
  return {
    type: "OPEN_ADMIN_CONSOLE"
  };
}

export function closeAdminConsole() {
  return {
    type: "CLOSE_ADMIN_CONSOLE"
  };
}

export function changeAdminTab(tab_value) {
  return {
    type: "CHANGE_TAB",
    payload: tab_value
  };
}

export function fetch_roles() {
  return {
    type: "FETCH_ROLES",
    payload: axios.get(`${constants.API_URI}/check_role`)
  };
}

export function fetchCompanies() {
  return {
    type: "FETCH_COMPANIES",
    payload: axios.get(`${constants.API_URI}/company`)
  };
}

export function submitAddUser(values) {
  const { name, lastname, email, company, role, phone, password } = values;
  return {
    type: "SUBMIT_ADD_USER",
    payload: axios.post(`${constants.API_URI}/add_user`, {
      email: email,
      last_name: lastname,
      first_name: name,
      phone_number: phone,
      company: company,
      role: role,
      password: password
    })
  };
}
