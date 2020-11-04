const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    user_name: {
        type: String
    },
    user_email: {
        type: String
    },
    user_mobile: {
        type: String
    }
});

module.exports = mongoose.model('User', User);