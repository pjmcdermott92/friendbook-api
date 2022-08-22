class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 200;
    }
};

module.exports = ErrorResponse;
