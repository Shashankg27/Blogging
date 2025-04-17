const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createToken } = require('../services/authentication');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: "/defaults/userAvatar.jpeg"
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }
});

userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPass = createHmac('sha256', salt)
                        .update(user.password)
                        .digest('hex');
                        
    this.salt = salt;
    this.password = hashedPass;
    
    next();
});

userSchema.static("checkPasswordAndCreateToken", async function(email, password){
    const user = await this.findOne({ email: email});
    if(!user) throw new Error("User not found!");
    const salt = user.salt;
    const hashedPass = createHmac('sha256', salt)
                .update(password)
                .digest('hex');

    if(hashedPass !== user.password) throw new Error("Incorrect Password");
    
    const token = createToken(user);
    return token;
});

const User = model("user", userSchema);

module.exports = User;