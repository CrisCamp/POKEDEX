// src/utils/auth/index.ts

// importo passport
import passport from 'passport'
// importo la strategia local
import LocalStrategy from './strategies/local.strategy'
// importo la strategia jwt
import JwtStrategy from './strategies/jwt.strategy'

passport.use(LocalStrategy)
passport.use(JwtStrategy)
