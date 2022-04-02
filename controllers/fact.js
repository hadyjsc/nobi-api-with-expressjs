const { default: axios } = require("axios")
const { Op, Sequelize } = require("sequelize")
const Query = require("../helpers/query")
const { facts } = require("../models")

const url_jokes = 'https://api.chucknorris.io/jokes/random'
const url_dogs = 'https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1'
const url_cats = 'https://catfact.ninja/fact'

class Facts {
    static async fetchData(req, res) {
        const { type } = req.params

        let api = null
        let response = {}
        if (type === 'jokes') {
            api = await axios.get(url_jokes);
            if (api.status === 200) {
                response = {
                    type: 'jokes',
                    value: data.data.value,
                    url: data.data.url
                }
            }
        } else if (type === 'dogs') {
            api = await axios.get(url_dogs)
            if (api.status === 200) {
                response = {
                    type: 'facts',
                    target: 'dogs',
                    value: api.data[0].fact
                }
            }
        } else {
            api = await axios.get(url_cats)
            if (api.status === 200) {
                response = {
                    type: 'facts',
                    target: 'cats',
                    value: api.data.fact
                }
            }
        }

        if (api.status === 200) {
            let insert = await new Query().table(facts).where({
                'value.velue': {
                    [Op.iLike]: '%' + response.value + '%'
                }
            }).oneCreate(response)
            console.log(insert);
            res.status(200).json({
                code: 200,
                type: 'success',
                title: 'Success',
                message: 'Jokes found',
                data: response
            })
        }
    }

    static async joke(req, res) {
        let list = await new Query().table(facts).where({ type: 'jokes' }).all()
        res.status(list.code).json(list)
    }

    static async dogs(req, res) {
        let list = await new Query().table(facts).where({ type: 'facts', target: 'dogs' }).all()
        res.status(list.code).json(list)
    }

    static async cats(req, res) {
        let list = await new Query().table(facts).where({ type: 'facts', target: 'cats' }).all()
        res.status(list.code).json(list)
    }
}

module.exports = Facts