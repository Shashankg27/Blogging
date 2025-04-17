require('dotenv').config()

const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const blog = require('./models/blog');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected MongoDB"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/', async (req, res) => {
    const keyword = req.query.keyword;
    let filter = {};

    if (keyword) {
        filter.title = { $regex: keyword, $options: 'i' };
    }

    const allBlogs = await blog.find(filter);
    res.render("home", { user: req.user, blogs: allBlogs });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute)

app.listen(process.env.PORT, () => console.log("App started at port:", process.env.PORT));