const User = require("../models/user");

const handleSignup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const profileImg = req.file ? `/uploads/${req.file.filename}` : '/defaults/userAvatar.jpeg'
    
    await User.create({
        firstName,
        lastName,
        email,
        password,
        profileImg
    });

    return res.redirect('/');
}

const handleSignin = async (req, res) => {
    const { email, password } = req.body;

    try{
        const token = await User.checkPasswordAndCreateToken(email, password);
        return res.cookie("token", token).redirect('/');
    }
    catch(error){
        return res.render("signin", { error: "Incorrect email or password!" });
    }
}

module.exports = { handleSignup, handleSignin };