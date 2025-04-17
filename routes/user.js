const { Router } = require("express");
const { handleSignup, handleSignin } = require("../controllers/user");
const multer = require('multer');
const path = require('path');
const Blog = require("../models/blog");
const comment = require("../models/comment");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage: storage })

router.get('/signin', (req, res) => {
    return res.render("signin");
})

router.get('/signup', (req, res) => {
    return res.render("signup");
})

router.get('/logout', (req, res) => {
    return res.clearCookie("token").redirect('/');
});

router.get('/myComments', async (req, res) => {
    const comments = await comment.find({ createdBy: req.user._id }).populate("blogId");

    return res.render("viewComments", {
        user: req.user,
        comments: comments
    })
})

router.get('/comment/edit/:id', async (req, res) => {
    const Comment = await comment.findOne({ _id: req.params.id });

    return res.render("editComment", {
        Comment
    })
})

router.post('/comment/edit/:id', async (req, res) => {
    const { content } = req.body;
    
    const Comment = await comment.findByIdAndUpdate(req.params.id, { content });

    return res.redirect(`/blog/${Comment.blogId}`);
})

router.post('/comment/:id', async (req, res) => {
    await comment.findByIdAndDelete({ _id: req.params.id });

    return res.redirect('/user/myComments');
})

router.post('/signup', upload.single('profileImg'), handleSignup);
router.post('/signin', handleSignin);

module.exports = router;