import axios from "axios";
import constants from "./../../Redux/constants"
const axiosConfig = {
    headers: {
        "content-Type": "application/json",
        Accept: "*/*"
    },
    withCredentials: false
};

export function login(username, password) {
    return {
        type : "LOGIN",
        payload: axios.post(`${constants.API_URI}/login`, {
            email: username,
            password: password
        }, axiosConfig)
    }
}

export function logout() {
    return {
        type : "LOGOUT",
        payload: {}
    }
}