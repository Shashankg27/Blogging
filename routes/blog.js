const { Router } = require("express");
const { handleAddBlog, handleCreateComment } = require("../controllers/blog");
const multer = require('multer');
const path = require('path');
const Blog = require("../models/blog");
const comment = require("../models/comment");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage: storage })

const router = Router();

router.get('/addBlog', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    });
})

router.get('/myBlogs', async (req, res) => {
    const blogs = await Blog.find({ createdBy: req.user._id });
    return res.render("home", {
        user: req.user,
        blogs: blogs
    });
});

router.get('/:id', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id}).populate('createdBy');
    const comments = await comment.find({ blogId: req.params.id }).populate('createdBy');
    return res.render('viewBlog', {
        user: req.user,
        blog: blog,
        comments: comments
    });
})

router.post('/delete/:id', async (req, res) => {
    await Blog.findByIdAndDelete({ _id: req.params.id });

    await comment.deleteMany({ blogId: req.params.id });

    return res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    return res.render('editBlog', {blog});
})

router.post('/edit/:id', upload.single('coverImg'), async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });

    const {title, description} = req.body;
    let coverImgURL = '/defaults/coverImg.jpeg';
    if(req.file) coverImgURL = `/uploads/${req.file.filename}`;
    else if(blog.coverImgURL) coverImgURL = blog.coverImgURL;

    await Blog.findByIdAndUpdate(req.params.id, {
        title,
        description,
        coverImgURL
    })

    return res.redirect(`/blog/${req.params.id}`);
})

router.post('/addBlog', upload.single('coverImg'), handleAddBlog);

router.post('/comment/:id', handleCreateComment)

module.exports = router;