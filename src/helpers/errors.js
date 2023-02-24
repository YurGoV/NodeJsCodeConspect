class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;

    }
}

class WrongPostIdError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;

    }
}

class UnAuthorized extends Error {
    constructor(message) {
        super(message);
        this.status = 401;

    }
}

module.exports = {
    ValidationError,
    WrongPostIdError,
    UnAuthorized,
}