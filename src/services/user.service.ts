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

  // Función buscar todos los usuarios
  async findAll() {
    const users = await Users.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!users || users.length === 0) {
      throw boom.notFound('There are no users')
    }

    return users
  }

  // Función buscar por correo
  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!user) {
      throw boom.notFound('User not found with email: ' + email)
    }

    return user
  }

  // Función actualizar usuario por ID
  async updateById(id: string, updateData: Partial<User>) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10)
    }
    const updatedUser = await Users.findByIdAndUpdate(id, updateData, {
      new: true
    }).catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!updatedUser) {
      throw boom.notFound('User not found or could not be updated')
    }

    return updatedUser
  }

  // Función eliminar usuario por ID
  async deleteById(id: string) {
    const deletedUser = await Users.findByIdAndDelete(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!deletedUser) {
      throw boom.notFound('User not found or could not be deleted')
    }

    return deletedUser
  }
}

export default UserService
