class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if (err.name === "CaseError") {
        const message = `Resource not found. Invalid ${err.path}`;
        return res.status(400).json({
            success: false,
            msg: message
        });
    }

    if (err.name === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        return res.status(400).json({
            success: false,
            msg: message
        });
    }

    if (err.name === "JsonWebTokenError") {
        const message = `Invalid JSON Web Token. Please try again`;
        return res.status(400).json({
            success: false,
            msg: message
        });
    }

    return res.status(err.statusCode).json({
        success: false,
        msg: err.message
    });
};

export default ErrorHandler;
