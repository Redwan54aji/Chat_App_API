const {
    Conversation
} = require('../models/conversation.model');
const {
    Message
} = require('../models/message.model');

module.exports.sendMessage = async (req, res) => {
    try {
        const {
            message
        } = req.body;
        const {
            id: receiverId
        } = req.params;
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            receiverId,
            senderId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(), newMessage.save()])
        // await conversation.save()
        // await newMessage.save()
        console.log(2)
        res.status(201).json(conversation)
    } catch (error) {
        console.log("Error in send Message controoller ", error.message)
        res.status(500).json({
            error: "Internal Server error"
        })
    }
}

module.exports.getMessage = async (req, res) => {
    try {
        const {
            id: userToChatId
        } = req.params;
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, userToChatId]
            }
        }).populate('messages')
        if (!conversation) {
            return res.status(200).json([])
        }
        const message = conversation.messages;
        res.status(200).json(message)
    } catch {
        console.log("Error in send Message controoller ")
        res.status(500).json({
            error: "Internal Server error"
        })
    }
}