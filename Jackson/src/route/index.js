const express = require('express');
const router = express.Router();
router.use('/user', require('./user_router'))
router.use('/file', require('./file_router'))
router.use('/messaging', require('./message_router'))
module.exports = router