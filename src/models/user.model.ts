// user.model.ts

import { Schema, model } from 'mongoose'
import { User, UserMethods, UserModel } from '../types/user.type'
// importo las constantes
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../utils/constants'

// nombre con el que voy a referir en el servicio
export const USER_REFERENCE = 'User'

// En el modelo de usuarios se agrega UserMethods
const Users = new Schema<User, UserModel, UserMethods>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    // le paso el arreglo de las expresions regulares que debe cumplir, y un mensaje en caso de que no sea valido
    match: [EMAIL_REGEX, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true,
    // le paso el arreglo de las expresions regulares que debe cumplir, y un mensaje en caso de que no sea valido
    match: [PHONE_NUMBER_REGEX, 'Please enter a valid phone number']
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  lastModified: {
    type: Date,
    default: () => Date.now()
  }
})

// Users tiene una propiedad que se llama metodos
// y detro de metodos crearé la función toClient
// y el toClient va a retornar un objeto con todas
// las propiedades que si se necesitan
Users.methods.toClient = function () {
  return {
    id: this._id as unknown as string,
    name: this.name,
    email: this.email,
    address: this.address,
    phoneNumber: this.phoneNumber,
    role: this.role
  }
} // este metodo debe de estar definido en el tipo

export default model(USER_REFERENCE, Users)
