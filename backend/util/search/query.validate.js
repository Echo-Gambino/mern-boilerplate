const Validator = require("validator");
const isEmpty = require("is-empty");
const { databaseName } = require("../../keys.secrets");

module.exports = function validateQuery(query) {
    let errors = {};

    // Convert empty fields to an empty string
    query.search = !isEmpty(query.search) ? query.search : "";

    if (Validator.isEmpty(query.search)) {
        errors.search = "Search term is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}