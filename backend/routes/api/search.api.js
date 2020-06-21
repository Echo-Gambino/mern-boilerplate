const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const searchUsers = require("../../util/search/users.search");
const validateQuery = require("../../util/search/query.validate");

router.get("/", [
    check('search').trim().escape(),
], (req, res) => {
    const { errors, isValid } = validateQuery(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Apply the search onto users
    let pUserQuery = searchUsers(req.body);

    // Compile all the searches into one list
    Promise.all(
        [pUserQuery]
    ).then(results => {
        // Merge results from all promises
        let output = [].concat.apply([], results);

        res.status(200).json(output);
    }).catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;