const express = require('express');
const { getUser ,deleteUser,updateUser,followUser,whoPost,searchUser,UnFollowUser} = require('../controller/userController');

const router = express.Router();

router.post('/user' , searchUser)
router.get('/user/:id' , getUser)
router.put('/user/update/:id',updateUser)
router.delete('/:id',deleteUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',UnFollowUser)
router.post('/user/whopost',whoPost)



module.exports = router