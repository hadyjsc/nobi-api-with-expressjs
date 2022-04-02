const { body, validationResult } = require("express-validator");

module.exports = {
    validate: (req, res, next) => {
        try {
            const error_validation = validationResult(req);
            if (!error_validation.isEmpty()) {
                res.status(200).json({
                    code: 200,
                    type: 'warning',
                    title: 'Warning',
                    message: 'Invalidate from input.',
                    data: error_validation.array()
                });
            } else {
                next()
            }
        } catch (e) {
            res.status(400).json({ code: 400, type: 'error', title: 'Error', message: e.message })
        }
    },
    validationRegistration: () => {
        return [
            body('email', "E-Mail is required.").notEmpty(),
            body('email', "E-Mail not valid.").isEmail(),
            body('password', 'Password target is required').notEmpty()
        ]
    },
    validationLogin: () => {
        return [
            body('email', "E-Mail is required").notEmpty(),
            body('email', "E-Mail not valid.").isEmail(),
            body('password', 'Password is required').notEmpty()
        ]
    },
    validationVerifyPIN: () => {
        return [
            body('email', "E-Mail is required").notEmpty(),
            body('email', "E-Mail not valid.").isEmail(),
            body('login_pin', "OTP is required").notEmpty(),
            body('login_pin', "OTP must be number").isNumeric()
        ]
    },
    validationResendPIN: () => {
        return [
            body('email', "E-Mail is required").notEmpty(),
            body('email', "E-Mail not valid.").isEmail()
        ]
    },
    validateForgotPasswordEmail: () => {
        return [
            body('email', "E-Mail is required").notEmpty(),
            body('email', "E-Mail not valid.").isEmail()
        ]
    },
    validateResetPassword: () => {
        return [
            body('password', "New Password is required").notEmpty(),
            body('token', "Token is required").notEmpty()
        ]
    }
}