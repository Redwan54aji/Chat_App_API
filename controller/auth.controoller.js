const qrcode = require('qrcode')
const {
    User
} = require('../models/User.model');
const bcrypt = require('bcryptjs')
const {
    generateTokenAndSetCookie
} = require('../utils/gnreteTokken')
const sigupUser = async (req, res) => {
    try {
        const {
            fullname,
            username,
            password,
            confirmPassword,
            gender
        } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "password don't match"
            })
        }
        const user = await User.findOne({
            username
        })
        if (user) {
            return res.status(400).json({
                error: "user already exists"
            })
        }

        // hash password

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girld?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashpassword,
            gender,
            profilepic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            await generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            const qruser = [
                newUser._id, newUser.fullname, newUser.username, newUser.profilepic,
            ]
            qrcode.toDataURL(qruser,
                function (err, url) {
                    res.status(201).json({
                        _id: newUser._id,
                        fullname: newUser.fullname,
                        username: newUser.username,
                        profilepic: newUser.profilepic,
                        url,
                    })
                })
        } else {
            res.status(400).json({
                error: "Invalid user data"
            })
        }
    } catch (error) {
        console.log('Error in sinup controller', error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        const user = await User.findOne({
            username
        })
        const isPasswordCorect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorect) {
            return res.status(400).json({
                error: "Invalid username or password"
            })
        }
        generateTokenAndSetCookie(user._id, res);
        const qruser = [
            user._id, user.fullname, user.username, user.profilepic,
        ]
        qrcode.toDataURL(qruser,
            function (err, url) {
                res.status(201).json({
                    _id: user._id,
                    fullname: user.fullname,
                    username: user.username,
                    profilepic: user.profilepic,
                    url,
                })
            })
    } catch (error) {
        console.log('Error in login controller', error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie("JWT", "", {
            maxAge: 0
        })
        res.status(200).json({
            message: "logged out successfully"
        })
    } catch {
        console.log('Error in logout controller', error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

module.exports = {
    loginUser,
    logoutUser,
    sigupUser
}