const Query = require("../helpers/query")
const { users } = require("../models")
const { bcrypt } = require('../helpers');

class User {
    static async detail(req, res) {
        const { controller, email } = req.body
        let detail = await new Query().table(users).where({ email }).one()
        return controller ? detail : res.status(detail.code).json(detail)
    }

    static async create(req, res) {
        const { controller, password } = req.body
        Object.assign(req.body, { password: bcrypt.hash(password), status: 2 })
        let created = await new Query().table(users).where({ email: req.body.email }).oneCreate(req.body)
        return controller ? created : res.status(created.code).json(created)
    }

    static async update(req, res) {
        const { id } = req.params
        const { controller } = req.body
        let update = await new Query().table(users).where({ id }).update(req.body)
        return controller ? update : res.status(update.code).json(update)
    }

}
module.exports = User