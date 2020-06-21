const Validator = require("validator");
const isEmpty = require("is-empty");

const cleanUserData = require("../../util/users/userData.clean");

const User = require("../../models/user.model");

module.exports = function searchUsers(searchData) {
    let searchString = !isEmpty(searchData.search) ? searchData.search : "";

    // Attempt to sanitize input
    searchString = searchString.replace('|', ' ');
    searchString = searchString.replace(',', ' ');
    searchString = Validator.trim(searchString);

    if (Validator.isEmpty(searchString)) {
        return new Promise(function (resolve) { resolve([]); });
    }

    let searchTokenList = [];
    searchTokenList.push(searchData.search);
    searchTokenList.push(...searchData.search.split(' '));

    let searchTokens = new Set(searchTokenList);

    let regex = new RegExp(Array.from(searchTokens).join('|'), 'i');

    let searchConditions = {
        $or: [
            {name: regex},
            {email: regex},
            {bio: regex},
        ]
    };

    let pUserQuery = new Promise(function (resolve, reject) {
        User.find(searchConditions, function (err, users) {
            if (err) {
                // ...
                reject(err);
            } else {
                // ...
                let output = [];

                for (let i = 0; i < users.length; i++) {
                    output.push(cleanUserData(users[i]));
                }

                resolve(output);
            }
        });
    });
    
    return pUserQuery;
}