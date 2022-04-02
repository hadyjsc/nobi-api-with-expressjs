module.exports = (err, req, res, next) => {
    const { error, code, type, title, status, message, register_token, name } = err;
    if (code === 400) {
        res.status(400).json(err)
    } else {
        if (error) {
            console.log({ message: 'ERROR AT TRY CATCH', error });
            res.status(status).json({ code, type, title, message, info: error.name });
        }
        if (status) {
            if (register_token) {
                res.status(status).json({ code, type, title, message })
            } else {
                res.status(status).json({ code, type, title, message });
            }
        } else {
            if (name === 'SequelizeValidationError' || name === 'SequelizeDatabaseError' || name === 'SequelizeConnectionError' || name === 'SequelizeUniqueConstraintError') {
                res.status(status).json({ code, type, title, message });
            } else {
                res.status(500).json({ code: 500, type: 'error', title: 'Error', message: message ? message : 'internal server error' });
            }
        }
    }
}