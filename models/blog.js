const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverImgURL: {
        type: String,
        default: '/defaults/coverImg'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
}, { timestamps: true }
);

const Blog = model("blog", blogSchema);

module.exports = Blog;