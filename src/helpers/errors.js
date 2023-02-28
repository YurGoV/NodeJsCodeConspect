class ValidationMainError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class ValidationError extends ValidationMainError {
    constructor(message) {
        super(message);
        this.status = 400;

    }
}

class WrongPostIdError extends ValidationMainError {
    constructor(message) {
        super(message);
        this.status = 400;

    }
}

class UnAuthorizedError extends ValidationMainError {
    constructor(message) {
        super(message);
        this.status = 401;

    }
}

module.exports = {
    ValidationMainError,
    ValidationError,
    WrongPostIdError,
    UnAuthorizedError,
}