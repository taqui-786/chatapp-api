const express = require('express')
const { registerUser ,loginUser} = require('../controller/AuthController')
const router = express.Router()

router.post('/register' , registerUser)
router.post('/login', loginUser)



module.exports= router