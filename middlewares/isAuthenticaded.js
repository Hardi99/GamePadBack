const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    // console.log(req.headers.authorization);
    // recherche de l'utilisateur via le token
    const user = await User.findOne({
      token: req.headers.authorization.replace("Bearer ", ""),
    });
    // console.log("user", user);
    if (!user) {
      return res.status(401).json({ error: "You need to be logged" });
    } else {
      req.user = user;
      return next();
    }
  } else {
    return res.status(401).json({ error: "Unauthorized2" });
  }
};

module.exports = isAuthenticated;