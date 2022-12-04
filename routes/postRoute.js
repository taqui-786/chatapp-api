const express = require('express');
const { createPost,updatePost,timelinePost,likePost,deletePost ,getPost,Actionusers} = require('../controller/postController');
const router = express.Router();

router.post("/posting",createPost)
router.get("/posting/:id",getPost)
router.put("/posting/update/:id",updatePost)
router.delete("/posting/delete/:id",deletePost)
router.put("/:id/like",likePost)
router.get("/posting/:id/timeline",timelinePost)
router.post("/posting/actionusers",Actionusers)


module.exports = router