const express = require('express')
const { createPost, getComment } = require('../controller/commentController')
const router = express.Router()

router.post('/post/add/comments',createPost)
router.get('/post/:postId/comments', getComment)

module.exports = router