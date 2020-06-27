import axios from "axios";

import { 
    GET_ERRORS,
    SET_SEARCH_RESULTS
} from "./types.action";

import {
    API_SEARCH_ENDPOINT
} from "../constants";

export const performSearch = (query, callback) => dispatch => {
    axios.post(API_SEARCH_ENDPOINT, query)
        .then(res => {
            dispatch({
                type: SET_SEARCH_RESULTS,
                query: query,
                result: res.data
            });

            callback(res);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
};