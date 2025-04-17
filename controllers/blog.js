const Blog = require('../models/blog');
const comment = require('../models/comment');

const handleAddBlog = async (req, res) => {
    const { title, description } = req.body;
    const coverImgURL = req.file ? `/uploads/${req.file.filename}` : '/defaults/coverImg.jpeg'

    const blog = await Blog.create({
        title,
        description,
        createdBy: req.user._id,
        coverImgURL: coverImgURL
    });

    return res.redirect(`/blog/${blog._id}`);
}

const handleCreateComment = async (req, res) => {
    await comment.create({
        content: req.body.content,
        blogId: req.params.id,
        createdBy: req.user._id
    });
    return res.redirect(`/blog/${req.params.id}`);
}

module.exports = { handleAddBlog, handleCreateComment };