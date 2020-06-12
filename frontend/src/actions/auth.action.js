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