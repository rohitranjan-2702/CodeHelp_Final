const errorMiddleware = (err, req, res, next) => {
  res.status(res.statusCode ? res.statusCode : 500);
  const error = {
    msg: err.message,
    stack: process.env.STATUS === "production" ? "" : err.stack,
  };
  res.json(error);
};

module.exports = errorMiddleware;
