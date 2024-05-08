// pokemon.type.ts
import type { Model } from 'mongoose'
// importo el tipo Generation
import { Generation } from './generation.type '
// Existen dos "tipos" de datos (los cuales exporto)
// Datos o propiedades de un Pokemon
export type Pokemon = {
  id?: string //el signo de interrogación hace que el atributo id no sea obligatorio, sino opcional
  name: string
  type: string
  weight: string
  height: string
  generation: Generation //agregue generation de tipo Generation
}
// Tambien existe el modelo del pokemon, (el modelo tendra más cosas,
// tendrá todo lo que mongo le asigne, como metodos para agregar
// información, consultar colecciónes, etc)
export type PokemonModel = Model<Pokemon>
