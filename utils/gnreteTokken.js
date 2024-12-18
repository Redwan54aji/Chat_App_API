const JWT = require('jsonwebtoken')
const generateTokenAndSetCookie = (userId, res) => {
    const token = JWT.sign({
        userId
    }, process.env.JWT_SCRIPT, {
        expiresIn: '30d'
    })
    res.cookie('JWT', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure:process.env.NODE_ENV!=="development",

    })
}
module.exports = {
    generateTokenAndSetCookie
};