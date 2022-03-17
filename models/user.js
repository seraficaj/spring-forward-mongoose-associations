const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    blogs: [{
        // store id of BlogPost, 1:M user: blogs
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost'
    }]
});

module.exports = mongoose.model('User', userSchema);