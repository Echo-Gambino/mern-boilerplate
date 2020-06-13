const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegData = require("../../util/users/register.validate");
const validateLgnData = require("../../util/users/login.validate");
const cleanUserData = require("../../util/users/userData.clean");

// User model
const User = require("../../models/user.model");

const {
    SECRET_KEY
} = require("../../constants");

// @route GET <api>/
// @desc Get a list of user items
// @access PUBLIC
router.get("/", (req, res) => {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            let userItems = [];
            
            for (let i = 0; i < users.length; i++) {
                userItems.push(cleanUserData(users[i]));
            }

            res.json(userItems);
        }
    });
});

// @route GET <api>/:id
// @desc Get the profile of the user
// @access PRIVATE (Temporarily PUBLIC)
router.get("/:id", (req, res) => {
    User.findById(req.params.id, function(err, user) {
        if (!user) {
            // HTTP status 404 means "NOT FOUND" error
            res.status(404).send("Data is not found");
            if (err) {
                console.log(err);
            }
        } else {
            res.json(cleanUserData(user));
        }
    });
});

// @route POST <api>/create
// @desc Create a user item and saves it in the server's database
// @access PUBLIC
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

// @route POST <api>/login
// @desc Login user and return JWT token
// @access PUBLIC
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLgnData(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    const invalidCredentialsMsg = "Invalid Credentials. Please try again.";

    User.findOne({ email })
        .then(user => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ ...errors, general: invalidCredentialsMsg });
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name
                        };

                        jwt.sign(
                            payload,
                            SECRET_KEY,
                            {
                                expiresIn: 86400 // 1 day in seconds
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        return res.status(400).json({ ...errors, general: invalidCredentialsMsg });
                    }
                })
        });

});

// @route POST <api>/remove/:id
// @desc Remove a user item from ther server's database by id
// @access PRIVATE (Temporarily PUBLIC)
router.post("/remove/:id", (req, res) => {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (user) {
            // If user is NOT null, that means that the user object is removed.
            res.status(200).send('Removal successful');
        } else if (err) {
            // If err is NOT null, that means that something has gone wrong, so report it.
            res.status(err.status).send(err);
        } else {
            // If NEITHER user nor err is valid, then we assume that the user object is not found.
            res.status(404).send('User not found');
        }
    });
});

module.exports = router;