const express = require('express');
const { CreateChat, userChat, findChat } = require('../controller/ChatController');
const router = express.Router()


router.post("/chat/createchat", CreateChat)
router.get("/chat/:userId", userChat)
router.get("/chat/find/:firstId/:secondId", findChat)
module.exports = router

