const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Create Scheme
const UserSchema = new Schema({
    
    username: {
        type: String,
        default: '',
        required: true
    },
   email: {
        type: String,
        default: '',
        required: false
    },
    password: {
        type: String,
        default: '',
        required: true
    }
   
});

module.exports = User = mongoose.model('user', UserSchema);