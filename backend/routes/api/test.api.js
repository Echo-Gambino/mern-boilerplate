const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        req: req,
        message: "Hello World"
    });
});

module.exports = router;