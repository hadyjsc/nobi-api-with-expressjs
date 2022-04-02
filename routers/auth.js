const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares')

const {
    AuthController
} = require('../controllers')

const auth = require('../validations/auth');

router.post('/register', auth.validationRegistration(), auth.validate, AuthController.register)
router.post('/login', auth.validationLogin(), auth.validate, AuthController.login)
router.post('/verify-otp', auth.validationVerifyPIN(), auth.validate, AuthController.otpVerify)
router.post('/logout', authenticate, AuthController.logout)
router.get('/decoded', authenticate, AuthController.decoded)

module.exports = router;