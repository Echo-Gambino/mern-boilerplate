const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const validateRegData = require("../../util/users/register.validate");

// User model
const User = require("../../models/user.model");

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
                userItems.push(users[i]);
            }

            res.json(userItems);
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