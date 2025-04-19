const passport = require("passport");
const registerModel = require("../models/registerShema");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        let user = await registerModel.findOne({ username: username });
        if (user) {
            if (user.password == password) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Incorrect password" });
            }
        } else {
            return done(null, false, { message: "User not found" });
        }
    } catch (error) {
        return done(error, false);
    }
}))


passport.serializeUser((user, done) => {
    return done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    let user = await registerModel.findById(id);
    return done(null, user);
});

const userPassportAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    return next();
  };

module.exports = {passport,userPassportAuth};