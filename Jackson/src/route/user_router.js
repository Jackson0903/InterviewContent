const express = require('express')
const router = express.Router()
const controller = require('../controller')
const { jwtVerify } = require('../middleware')
const { validateRequest } = require('../validation/auth.validation');
const { signupSchema, loginSchema } = require('../validation/auth.validation');

router.post('/signup', validateRequest(signupSchema), controller.user.signup);
router.post('/login', validateRequest(loginSchema), controller.user.login );
module.exports = router