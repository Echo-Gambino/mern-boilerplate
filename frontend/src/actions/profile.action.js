import axios from "axios";
import { GET_ERRORS } from "./types.action";

import {
    API_GETUSER_ENDPOINT
} from "../constants";

// Get User
export const getUser = (id, callback) => dispatch => {
    axios.get(API_GETUSER_ENDPOINT + id)
        .then(res => {
            callback(res);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};