import axios from "axios";

import {
    GET_ERRORS
} from "./types.action";

// Register
export const registerUser = (userData, callback) => dispatch => {
    axios.post("/users/create", userData)
        .then(res => {
            callback();
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const loginUser = (userData) => dispatch => {
    // Login User
    console.log("[auth.action] loginUser:");
    console.log(userData);

    /*
    axios.post("/users/login", userData)
        .then(res => {
            // Success
        })
        .catch(err => {
            dispatch({
                GET_ERRORS,
                payload: err.response.data
            })
        });
    */
};