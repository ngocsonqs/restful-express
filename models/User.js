const mongoose = require('mongoose');
const {Schema} = mongoose;

/**
 * Define User Schema
 *
 * @type {*|Mongoose.Schema}
 */
const userSchema = new Schema({
    'username' : String,
    'email' : String,
    'fullname' : String,
    'age' : {type: Number, min : 18, max: 65},
    'location' : String,
    'gender' : Number
});

// kết nối schema này với userSchema ở mongoose
var user = mongoose.model('users', userSchema);
