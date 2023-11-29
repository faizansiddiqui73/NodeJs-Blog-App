const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSChema = new Schema({
    username: {
        type: String,
        reqired: true,
        unique: true
    },
    password:{
        type:String,
        reqired: true
    }
});

const User = mongoose.model('User', UserSChema);

module.exports = User;