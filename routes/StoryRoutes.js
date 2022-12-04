const express = require('express');
const {CreateStory , timelineStory } = require('../controller/StoryController')
const router = express.Router();

router.post("/story/create", CreateStory )
router.get("/story/all/:id",timelineStory)

module.exports = router