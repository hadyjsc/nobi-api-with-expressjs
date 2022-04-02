const { jwt } = require('../helpers');
const Query = require('../helpers/query');
const { users } = require('../models');

module.exports = async(req, res, next) => {
    const { authorization } = req.headers
    if (authorization) {
        try {
            let bearer = authorization.split(' ');
            let bearerToken = bearer[1];
            let token = bearerToken;
            let decoded = jwt.verify(token);
            if (!decoded) {
                next({
                    status: 403,
                    code: 403,
                    type: 'warning',
                    title: 'Warning',
                    message: 'Incorect access token'
                });
            } else {
                let detail = await new Query().table(users).where({ email: decoded.email }).one()
                if (detail.type === 'success') {
                    if (detail.data.status === 2 || detail.data.status === 3) {
                        req.token = token
                        req.decoded = decoded;
                        next();
                    } else {
                        next({
                            status: 200,
                            code: 200,
                            type: 'warning',
                            title: 'Warning',
                            message: 'User is inactive.'
                        });
                    }
                } else {
                    next(detail);
                }
            }
        } catch (error) {
            const err = {
                status: 403,
                code: 403,
                type: 'warning',
                title: 'Warning',
                message: 'Not allowed to access'
            };
            next(err);
        }
    } else {
        const err = {
            status: 403,
            code: 403,
            type: 'warning',
            title: 'Warning',
            message: 'Access denied, no token or authorization key assigned.'
        }
        next(err);
    }
};