const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const validateRegData = require("../../util/users/register.validate");

// User model
const User = require("../../models/user.model");

// @route POST <api>/create
router.post("/create", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegData(req.body);

    // Check validation
    if (!isValid) {
        // If the data is NOT valid, then raise a status code (400), 
        // and send a json object with all the error messages in it.
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email}).then(user => {
        if (user) {
            // If the server can find another user by
            // the email used for registering, then output an error
            // (Duplicate user name/ids)
            return res.status(400).json({ email: "Email already taken!" });
        } else {
            // If the server found no other user with that email,
            // proceed to create the user.
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(user))
                })
            });
        }
    })

});

module.exports = router;