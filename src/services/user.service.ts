// user.service.ts

// import el modelo
import Users from '../models/user.model'
// importo el tipo
import { User, UserModel } from '../types/user.type'
// importo la libreria de boom
import boom from '@hapi/boom'
// importo la libreria de encriptación
import bcrypt from 'bcrypt'

class UserService {
  // Función crear usuario
  async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    // Le paso el objeto (...user) que copiará todas las propiedades del objeto user dentro del nuevo objeto que se va a crear
    // este proceso lo que hará es pasar individualmente cada propiedad del objeto
    // y por otro lado especifico como instará el campo contraseña (password: hashedPassword)
    const newUser = await Users.create({
      ...user, //importante no omitir los '...'
      password: hashedPassword
    }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    //envio error en caso de no crear el usuario
    if (!newUser) {
      throw boom.badRequest('Could not create user')
    }

    return newUser
  }

  // Función extra buscar todos los usuarios
  async findAll() {
    const users = await Users.find().catch((error) => {
      // Ahora este error sería de mongo
      console.log('Error while connecting to the DB', error)
    })
    // Si no existen pokemons manda el error
    if (!users) {
      throw boom.notFound('There are not users')
    }
    return users
  }

  // Función para buscar por correo
  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!user) {
      throw boom.notFound('User not found with email: ' + email)
    }

    return user
  }
}

export default UserService
