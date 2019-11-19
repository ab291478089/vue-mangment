// token 验证相关插件引入
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
// model 引用
const mongoose = require('mongoose')
const User = mongoose.model('users')

const keys = require('../config/keys')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findById(jwt_payload.id)
            .then((user) => {
                if(user) {
                  return done(null, user)
                } 

                return done(null,false)
            })
            .catch(err => {
              console.log(err)
            })
    }));
}