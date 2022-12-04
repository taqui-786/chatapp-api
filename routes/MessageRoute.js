const express = require('express')
const { sendMessage, receiveMessage } = require('../controller/MessageController')
const router = express.Router()

router.post('/message/send', sendMessage)
router.get('/message/receive/:ChatId',receiveMessage)

module.exports = router