const url = require("url");
const BooksController = require("./BooksController");

class ResponseHandler {
    static success(res, statusCode, message, data = {}) {
        res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({
            status: "success",
            message,
            data
        }));
    }

    static fail(res, statusCode, message) {
        res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({
            status: "fail",
            message
        }));
    }
}

module.exports = ResponseHandler;
