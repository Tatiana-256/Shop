module.exports = (funk) => (req, res, next) =>
  Promise.resolve(funk(req, res, next)).catch(next);
