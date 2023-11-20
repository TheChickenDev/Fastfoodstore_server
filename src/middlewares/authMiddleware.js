const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authAdminMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'THE AUTHENTICATION',
            });
        }
        if (user?.isAdmin) {
            next();
        } else {
            return res.status(404).json({
                status: 'ERROR',
                message: 'THE AUTHENTICATION',
            });
        }
    });
};

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'THE AUTHENTICATION',
            });
        }
        if (user?.isAdmin || user?.id === userId) {
            next();
        } else {
            return res.status(404).json({
                status: 'ERROR',
                message: 'THE AUTHENTICATION',
            });
        }
    });
};

module.exports = {
    authAdminMiddleware,
    authUserMiddleware,
};
