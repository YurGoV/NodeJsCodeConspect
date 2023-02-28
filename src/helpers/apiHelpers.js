// const {ValidationError, WrongPostIdError} = require('./errors')
const {ValidationMainError} = require('./errors')


const asyncWrapper = (controller) => {
    return (req, res, next) => {
        console.log('apiHelpers req.body: ', req.body);
        console.log('req-s in apiHelpers  :', '/', req.body, '/', req.user, '/', req.token, '/')
        controller(req, res)
            .catch(next);
    };
}


const errorHandler = (error, req, res, next) => {

    if (
        // error instanceof ValidationError ||
        // error instanceof WrongPostIdError
        error instanceof ValidationMainError
    ) {
        return res.status(error.status).json({message:  error.message})
        // return res.status(error.status).json({message: JSON.stringify(error.message)})

    }
    res.status(500).json({message: error.message})
}

module.exports = {
    asyncWrapper,
    errorHandler,
};
