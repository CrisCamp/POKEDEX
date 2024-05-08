//pokemon.model.ts
// importar el modelo y esquema de moongose “se crea la tabla o la colección”
import { Schema, model } from 'mongoose'
// importo los tipos creados para este modelo
import { Pokemon, PokemonModel } from '../types/pokemon.type'
// importo la referecia de Generation
import { GENERATION_POKEMON_REFERENCE } from './generation.model'

// nombre con el que voy a referir en el servicio
export const POKEMON_REFERENCE = 'Pokemon'

//Para crear un modelo se pone en plural(Pokemons), por ser la colección de pokemons
// será igual a un nuevo esquema, y será del tipo Pokemon y el modelo PokemonModel.
// (dentro de "<" ">" se debe poner el tipo que se va a implementar y el modelo)
// Esto esta creando un nuevo objeto y la clase(Creó que la clase Schema), en su constructor
// recibe un objeto, donde tiene toda la definción de nuestro pokemon: name, type, weigth, heigth
// (id lo pone mongo)
const Pokemons = new Schema<Pokemon, PokemonModel>({
  //id no se pone porque eso lo pone moongo
  //Define la propiedad de la colección Pokemon
  name: {
    type: String, //tipo
    required: true, //es requerido
    unique: true, //es unica
    index: true, //al ser unica debe estar indexada
    trim: true //le quita los espacios al principio y al final
  },
  type: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  weight: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  height: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  generation: {
    // generation tendra un id, representaria la foreign key
    type: Schema.Types.ObjectId,
    // especifico la referencia
    ref: GENERATION_POKEMON_REFERENCE
  }
})
// Después de tener el squema hecho lo exporto, se crea un modelo a partir de dicho esquema
export default model(POKEMON_REFERENCE, Pokemons)
// 'POKEMON_REFERENCE' es el nombre al que me referiré a la colección en los servicios
// 'Pokemons' es el esquema que creé
