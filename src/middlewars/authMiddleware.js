const jwt = require('jsonwebtoken')
const {UnAuthorizedError} = require('../helpers/errors')


const authMiddleware = (req, res, next) => {
    // token?
    try {
        console.log('req.headers in authMiddleware', req.headers);
        const [, token] = req.headers['authorization'].split(' ');// todo: fix "split of undefined // validate token type"
        console.log('token in authMiddleware: /', token);
        if (!token) {
            next(new UnAuthorizedError('Please, provide a token'))
        }
        // decode
        // try {
        const user = jwt.decode(token, process.env.JWT_SECRET)

        console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
        console.log('user in aMiddleware', user);

        // write to req.user
        req.token = token;
        req.user = user;

        console.log('req-s in aMiddleware :', '/', req.body, '/', req.user, '/', req.token, '/');

        // next();
    } catch (err) {
        next(new UnAuthorizedError('invalid token'))
    }

    // next()
    next();
}

module.exports = {
    authMiddleware,
}