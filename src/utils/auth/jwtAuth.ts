// jwAuth.ts

// importo la dependencia de JWT
import jwt from 'jsonwebtoken'
// importo el objeto config
import { config } from '../../config/config'

// crearé una función que reciba un objeto tipo string
// y valide que el token no este vacio
const verifyJwt = (token: string) => {
  // si no recibe un token, retorna null
  if (!token) return null

  try {
    // decodifico el token
    const decoded = jwt.verify(token, config.jwtSecret)

    //si no se logra la decodificación regresa null
    if (!decoded) return null

    // retorno el payload {sub: id}
    return decoded
  } catch (error) {
    console.log(error)
  }
}

// función para extraer
const extractFromJwt = (authorization: string) => {
  // regresa Bearer token
  const token = authorization.split(' ')[1]

  return verifyJwt(token)
}

// exporto las funciones, extractFromJwt no es necesario exportarla
export { verifyJwt, extractFromJwt }
