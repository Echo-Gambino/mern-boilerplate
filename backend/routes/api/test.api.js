const express = require("express");
const router = express.Router();

const util = require('util');

router.get('/', (req, res) => {

    console.log(req);

    res.json({
        message: "Hello World"
    });
});

module.exports = router;