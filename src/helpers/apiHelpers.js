const {ValidationError, WrongPostIdError} = require('./errors')

const asyncWrapper = (controller) => {
    return (req, res, next) => {
        console.log('apiHelpers req.body: ',req.body);
        controller(req, res).catch(next);
    };
}

const errorHandler = (error, req, res, next) => {

    if (
        error instanceof ValidationError ||
        error instanceof WrongPostIdError
    ) {
        return res.status(error.status).json({message: error.message})
    }
    res.status(500).json({message: error.message})
}

module.exports = {
    asyncWrapper,
    errorHandler,
};
