// local.strategy.ts

// importar Strategy de passport (es como su propia estrategia)
import { Strategy } from 'passport-local'
// importar bcrypt (libreria para encriptar)
import bcrypt from 'bcrypt'
// importar boom en caso de errores
import boom, { unauthorized } from '@hapi/boom'
// importo los servicios user
import UserService from '../../../services/user.service'
// importo el tipo user
import { User } from '../../../types/user.type'

// creo el objeto de las opciones
// usernameField = el campo que identificara al usuario (tambien se puede enviar el nombre del usuario, pero se opta mejor por el correo)
// passwordField = el campo que identificara la constraseña del mismo usuario

// Nota importante usernameField y passwordField deben estar escritos de esa forma no de otra sino no funcionará

const options = { usernameField: 'email', passwordField: 'password' }

// instancio un objeto de tipo UserService
const service = new UserService()

// creo la estrategia, le paso el objeto de opciones(options),
// tambien le mando una funcion que maneje el correo(email) la contraseña(password) y un middleware(next)
// dicha funcion intentara extraer la información del usuario
const LocalStrategy = new Strategy(options, async (email, password, next) => {
  try {
    const user: User = (await service.findByEmail(email)) as unknown as User
    // validar constraseña
    if (user) {
      // bcrypt compara la contraseña con la que esta encriptada
      const isMatch = await bcrypt.compare(password, user.password)
      delete user.password //hago que no retorne la contraseña
      // si hace match se permite el acceso
      if (isMatch) {
        next(null, user)
      } else {
        // en caso contrario se envia un unauthorized
        next(boom.unauthorized('Usuario o contraseña no validas'), false)
      }
    } else next(boom.unauthorized('Usuario o contraseña no validas'), false)
  } catch (error) {
    next(error, false)
  }
})

export default LocalStrategy
