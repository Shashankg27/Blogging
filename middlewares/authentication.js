const { validateToken } = require("../services/authentication");

const checkForAuthenticationCookie = (cookiesName) => {
    return (req, res, next) => {
        const cookieValue = req.cookies[cookiesName];

        if(!cookieValue) return next();

        try{
            const userPayload = validateToken(cookieValue);
            req.user = userPayload;
        }
        catch(error){}

        return next();
    }
}

module.exports = { checkForAuthenticationCookie };