// pokemon.service.ts
//Se necesita importar los Pokemons del modelo
import Pokemons from '../models/pokemon.model'
//Se necesita importar el tipo
import { Pokemon } from '../types/pokemon.type'
import boom from '@hapi/boom'
// importo el modelo de Generation
import Generation from '../models/generation.model'

//Creo una clase llamada PokemonService, en ella agrego los
//metodos que utilizare para conectarme a la base de datos
class PokemonService {
  //INSERTAR
  //esta funcion recibira un objeto de tipo pokemon
  async create(pokemon: Pokemon) {
    // Validar si la generación existe
    const generation = await Generation.findOne({
      generation: pokemon.generation
    })

    if (!generation) {
      throw boom.badRequest('The pokemon generation does not exist')
    }
    //Ahora llamo al modelo
    //el AWAIT es para esperar a que termine ya que es una promesa
    //mando el pokemon que quiero crear
    //se pone un catch para mostrar el error
    const newPokemon = await Pokemons.create({
      ...pokemon,
      generation: generation.id
    }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    //envio error en caso de no crear el pokemon
    if (!newPokemon) {
      throw boom.badRequest('Could not create pokemon')
    }

    return newPokemon
  } // En otras palabras....
  // la funcion create(pokemon: Pokemon) dice que al modelo de Pokemons agrega
  // un pokemon nuevo y si ocurre un error lo logeo o muestro con console.log

  //Metodo para que encuentre todo
  async findAll() {
    const pokemons = await Pokemons.find()
      .populate('generation')
      .populate('evolutions preEvolutions')
      .catch((error) => {
        // Ahora este error sería de mongo
        console.log('Error while connecting to the DB', error)
      })
    // Si no existen pokemons manda el error
    if (!pokemons) {
      throw boom.notFound('There are not pokemons')
    }
    return pokemons
  }

  //Metodo para que encuentre por ID
  async findById(id: string) {
    const pokemon = await Pokemons.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    // Si no existe el id del pokemon manda el error
    if (!pokemon) {
      throw boom.notFound('Pokémon not found with id: ' + id)
    }
    return pokemon
  }

  //Metodo para que encuentre por Nombre
  async findByName(name: string) {
    // findOne porque en el modelo el nombre es único, si es find retorna un arreglo
    // entre parentesis mando un objeto con las propiedades que quiero buscar
    // en este caso se busca por el atributo 'name'
    // naturalmente la manera de buscar por el metodo seria: findOne({ name: name })
    // el primer 'name' representa el atributo del objeto guardado en el modelo y el segundo 'name'
    // la variable en el parametro, pero ya que ambas 'por asi decirlo' se llaman igual la declaración en la
    // función se puede dejar asi: findOne({ name })
    const pokemon = await Pokemons.findOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    // Si no existe el nombre del pokemon, se lanza el error
    if (!pokemon) {
      throw boom.notFound('Pokémon not found with name: ' + name)
    }

    return pokemon // Devolver el Pokémon encontrado
  }

  // Método para actualizar un Pokémon por ID
  async updateById(id: string, updateData: Partial<Pokemon>) {
    // Validar si la generación existe
    if (updateData.generation) {
      const generation = await Generation.findOne({
        generation: updateData.generation
      })

      if (!generation) {
        throw boom.badRequest('The pokemon generation does not exist')
      }

      // Transformar el número de generación a su ID correspondiente
      updateData.generation = generation.id
    }

    // Actualizar el Pokémon en la base de datos
    const updatedPokemon = await Pokemons.findByIdAndUpdate(id, updateData, {
      new: true
    }).catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!updatedPokemon) {
      throw boom.notFound('Pokémon not found or could not be updated')
    }

    return updatedPokemon
  }

  // Eliminar un Pokémon por ID
  async deleteById(id: string) {
    // Buscar todos los pokemons que tengan el pokemon a eliminar en evolutions
    const pokemonsWithEvolutions = await Pokemons.find({
      evolutions: id
    }).exec()
    for (const pokemon of pokemonsWithEvolutions) {
      // Remover la referencia del pokemon a eliminar de su lista de evolutions
      pokemon.evolutions = pokemon.evolutions.filter(
        (evoId) => evoId.toString() !== id
      )
      await pokemon.save()
    }

    // Buscar todos los pokemons que tengan el pokemon a eliminar en preEvolutions
    const pokemonsWithPreEvolutions = await Pokemons.find({
      preEvolutions: id
    }).exec()
    for (const pokemon of pokemonsWithPreEvolutions) {
      // Remover la referencia del pokemon a eliminar de su lista de preEvolutions
      pokemon.preEvolutions = pokemon.preEvolutions.filter(
        (preEvoId) => preEvoId.toString() !== id
      )
      await pokemon.save()
    }

    // Finalmente, eliminar el pokemon
    const deletedPokemon = await Pokemons.findByIdAndDelete(id).exec()

    if (!deletedPokemon) {
      throw boom.notFound('Pokémon not found or could not be deleted')
    }

    return deletedPokemon
  }
} // Este metodo se encarga de encontrar todos los pokemons
//Exportar la clase para poder acceder desde fuera
export default PokemonService
