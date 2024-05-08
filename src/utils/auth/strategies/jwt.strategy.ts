// jwt.strategy.ts

// importo la estrategia de passport-jwt
import { Strategy, ExtractJwt } from 'passport-jwt'
// importo el objeto config para hacer uso del secreto
import { config } from '../../../config/config'

// variable de opciones
const options = {
  // funciona igual que la función del archivo jwtAuth.ts "extractFromJwt"
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  secretOrKey: config.jwtSecret
}

// creo la estrategia, donde recibe las opciones una función que a su vez recibe el payload, el next (middleware)
const JwtStrategy = new Strategy(options, (payload, next) => {
  return next(null, payload)
})

export default JwtStrategy
