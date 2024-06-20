// user.type.ts

// importar modelo de mongoose
import type { Model } from 'mongoose'
// importo Request de express
import type { Request } from 'express'

// tipo de dato
// el usuario será todo lo que contenga toClient
export type User = ToClientUser & {
  //composicion
  password: string
  role: string
  // en una bdd por cuestiones de auditorias se agrega:
  // cuando fue creado
  createdAt?: Date
  // cuando fue modificado
  lastModified?: Date
}

export type UserRequestType = Request & {
  user: User
}

// creé un tipo que contendra todas las propiedades que iran al cliente
export type ToClientUser = {
  id?: string
  name: string
  email: string
  address: string
  phoneNumber: string
}

// UserMethods tiene una función llamada toClient que es una función que retorna
// un objeto tipo ToClientUser
export type UserMethods = {
  toClient: () => ToClientUser
}

// exportar modelo, dentro del mismo el User, objeto vacio porque no modificare
// las propiedades del documento y por ultimo los metodos
export type UserModel = Model<User, {}, UserMethods>
