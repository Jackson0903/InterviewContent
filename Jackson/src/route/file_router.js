const express = require('express')
const router = express.Router()
const controller = require('../controller')
const { jwtVerify } = require('../middleware')

router.post('/upload', jwtVerify,(req, res) => { controller.file.upload(req, res) })
module.exports = router