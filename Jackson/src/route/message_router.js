const express = require('express')
const router = express.Router()
const controller = require('../controller')
const { jwtVerify } = require('../middleware')

router.post('/sendmessage', jwtVerify,(req, res) => { controller.message.sendmessage(req, res) })
router.post('/receivemessage', jwtVerify,(req, res) => { controller.message.receivemessage(req, res) })
router.get('/startTyping/:receiverId', jwtVerify,(req, res) => { controller.message.startTyping(req, res) })
router.get('/stopTyping/:receiverId', jwtVerify,(req, res) => { controller.message.stopTyping(req, res) })
module.exports = router