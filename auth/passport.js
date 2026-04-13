const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/user");

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies.token;
  }
  return null;
};

const opts = {
  jwtFromRequest: cookieExtractor, 
  secretOrKey: process.env.JWT_SECRET,
};

const passportAuth = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id).select("-password");

        if (!user) return done(null, false);

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

module.exports = passportAuth;