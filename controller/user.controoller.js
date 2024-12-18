const {
    User
} = require('../models/User.model')

module.exports.getUserForSidebar = async (req, res) => {
    try {
        const loggedUserId = req.user._id
        const filteredUser = await User.find({
            _id: {
                $ne: loggedUserId
            }
        }).select('-password')
        res.status(200).json(filteredUser)
    } catch (error) {
        console.log("Error in send user controoller")
        res.status(500).json({
            error: "Internal Server error"
        })
    }
}