const User = require("./user")
const { bcrypt, jwt } = require('../helpers');

class Auth {
    static async register(req, res) {
        Object.assign(req.body, { controller: true })
        let create = await User.create(req, res)
        if (create.code === 200) {
            create.message = "E-Mail has been registered."
            create.data = null
        } else {
            create.message = "Register successful."
            create.data = null
        }
        return res.status(create.code).json(create)
    }

    static async login(req, res) {
        const { password } = req.body
        Object.assign(req.body, { controller: true })
        let user_detail = await User.detail(req, res)
        if (user_detail.type === 'success') {
            let valid = bcrypt.compare(password, user_detail.data.password);
            if (valid) {
                let json = {
                    id: user_detail.data.id,
                    name: user_detail.data.name ? user_detail.data.name.fullname : null,
                    email: user_detail.data.email
                }
                let token = jwt.sign(json)

                /** Update status to Active or Logged IN */
                req.params.id = user_detail.data.id
                req.body = {}
                Object.assign(req.body, {
                    controller: true,
                    status: 3
                })
                await User.update(req, res)

                res.status(200).json({
                    code: 200,
                    title: 'Success',
                    type: 'success',
                    message: `Welcome, login successful.`,
                    data: { token }
                });
            } else {
                res.status(200).json({
                    code: 200,
                    title: 'Warning',
                    message: 'Username and password not match.',
                    type: 'warning'
                });
            }
        } else {
            res.status(200).json({
                code: 200,
                title: 'Warning',
                message: 'Incorrect Username or Email.',
                type: 'warning'
            });
        }
    }

    static async otpVerify(req, res) {

    }

    static async decoded(req, res) {
        const { decoded } = req;

        res.status(200).json({
            code: 200,
            title: 'Success',
            type: 'success',
            message: 'User information',
            data: decoded
        });
    }

    static async logout(req, res) {
        const { decoded } = req

        req.params.id = decoded.id
        Object.assign(req.body, {
            controller: true,
            status: 2
        })
        let update = await User.update(req, res)
        if (update.type === 'success') {
            update.message = "Logout successful."
            update.data = null
        }
        res.status(update.code).json(update)
    }
}
module.exports = Auth