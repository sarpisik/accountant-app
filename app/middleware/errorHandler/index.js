module.exports = (error, res, status = 500) =>
  res.status(status).send({ type: 'database', error });
