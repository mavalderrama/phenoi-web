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

export function expandProjects() {
  return {
    type: "EXPAND_PROJECTS"
  };
}

export function closeProjects() {
  return {
    type: "CLOSE_PROJECTS"
  };
}
