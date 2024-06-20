// auth.route.ts

import express from 'express'
import passport from 'passport'

// importo la dependencia JWT
import jwt from 'jsonwebtoken'
// importo el archivo de configuración, para utilizar el secreto jwt
import { config } from '../config/config'
// importo el tipo UserRequestType para obtener el usuario por medio del request
import { UserRequestType } from '../types/user.type'
// importo los servicios de user
import UserService from '../services/user.service'

const router = express.Router()
const service = new UserService()

router.post(
  '/login',
  // en passport uso el metodo de autenticación y le paso la estrategia 'local'
  passport.authenticate('local', { session: false }),
  // esta function callback funcionará siempre y cuando el middleware passport
  //el req apartir de ahora será de tipo RequestType
  async (req: UserRequestType, res, next) => {
    try {
      //consultar el usuario, por medio de un Request
      // de request voy a obtener user
      const { user } = req
      //console.log(user) //console.log para mostrar los datos completos del usuario en la terminal
      // sub is the id of the subscribed user
      const payload = { sub: user.id, role: user.role }
      // la variable jwt tiene un metodo llamado sign de firmar
      // dicha función recibirá el payload que va a firmar y el secreto
      // esta función es la crea el token
      const token = jwt.sign(payload, config.jwtSecret)
      // obtengo el 'modelo' del mismo usuario por medio del backend
      // esto es importante ya que la función toClient() funciona
      // con los usuarios provenientes del modelo y no del req
      const bdUser = await service.findByEmail(user.email)
      //ahora retorno el usuario, junto el token
      res.status(200).json({ user: bdUser.toClient(), token })
    } catch (error) {
      next(error)
    }
  }
)

export default router
