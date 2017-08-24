function ensureLoggedIn(req, res, next) {
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  }
  if (!req.user) {
    res.sendStatus(401);
  } else {
    next();
  }
}

function pass(req, res, next) {
  next();
}

module.exports = { ensureLoggedIn, pass };
