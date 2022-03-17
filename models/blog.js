const mongoose = require("mongoose");

// define the embedded child schema
const commentSchema = new mongoose.Schema({
    header: String,
    body: String,
    date: Date
})

const blogPostSchema = new mongoose.Schema({
    title: String,
    body: String,
    // 1 blog : many comments
    comments: [commentSchema],
    // a blog can have a blogger which references User model
    blogger : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// both schemas are made into model and submodel here
module.exports = mongoose.model('BlogPost', blogPostSchema);