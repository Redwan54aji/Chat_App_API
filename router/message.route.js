const express = require('express');
const {
    sendMessage,
    getMessage
} = require('../controller/message.controoller');
const {
    protectRoute
} = require('../middleware/protectRoute')
const router = express.Router();
router.get('/:id', protectRoute, getMessage);
router.post('/send/:id', protectRoute, sendMessage);
module.exports = router;