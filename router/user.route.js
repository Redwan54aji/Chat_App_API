const express = require('express')
const {getUserForSidebar}=require('../controller/user.controoller')
const router = express.Router();
const {
    protectRoute
} = require('../middleware/protectRoute')
router.get('/', protectRoute,getUserForSidebar)

module.exports = router