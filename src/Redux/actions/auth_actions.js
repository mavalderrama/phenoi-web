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

export function login(username, password) {
  return {
    type: "LOGIN",
    payload: axios.post(
      `${constants.API_URI}/login`,
      {
        email: username,
        password: password
      },
      axiosConfig
    )
  };
}

export function is_sessionActive() {
  let auth = {};
  let id =
    localStorage.getItem("id") != null
      ? localStorage.getItem("id")
      : sessionStorage.getItem("id");
  let user =
    localStorage.getItem("user") != null
      ? localStorage.getItem("user")
      : sessionStorage.getItem("user");
  if (id && user) {
    auth = { id: id, user: user };
  } else auth = false;
  return {
    type: "IS_ACTIVE",
    payload: auth
  };
}

export function logout() {
  return {
    type: "LOGOUT",
    payload: axios.post(`${constants.API_URI}/logout`, {}, axiosConfig)
  };
}

export function checkRoles(username) {
  console.log("checking roles");
  return {
    type: "CHECK_ROLE",
    payload: axios.post(
      `${constants.API_URI}/check_role`,
      { email: username },
      axiosConfig
    )
  };
}
