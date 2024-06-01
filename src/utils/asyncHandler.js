module.exports = (resHandler) => {
    return (req, res, next) => { Promise.resolve(resHandler(req, res, next)).catch((err) => next(err)) };
}
