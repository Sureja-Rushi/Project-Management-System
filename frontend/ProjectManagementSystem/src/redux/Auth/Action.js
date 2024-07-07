import axios from "axios";
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes"
import { API_BASE_URL } from "@/config/api";

export const register = userData => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: REGISTER_SUCCESS, payload: data })
        }

        console.log("register success", data);
    } catch (error) {
        console.log(error)
    }
}

export const login = userData => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: LOGIN_SUCCESS, payload: data })
        }

        console.log("login success", data);
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error("Backend error: ", error.response.data);
            if (error.response.status === 500) {
                alert("Internal Server Error. Please try again later.");
            } else {
                alert(`Error: ${error.response.data.message}`);
            }
        } else if (error.request) {
            // Request was made but no response was received
            console.error("Network error: ", error.request);
            alert("Network error. Please check your connection.");
        } else {
            // Something else happened
            console.error("Error: ", error.message);
            alert("An unexpected error occurred. Please try again.");
        }
    }
}

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        // if (data.jwt) {
            // localStorage.setItem("jwt", data.jwt);
            dispatch({ type: GET_USER_SUCCESS, payload: data })
        // }

        console.log("login success", data);
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => async(dispatch) => {
    dispatch({type:LOGOUT});
    localStorage.clear();
}