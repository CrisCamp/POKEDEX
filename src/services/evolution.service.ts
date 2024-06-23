// evolution.service.ts

import Evolutions from '../models/evolution.model'
import { Evolution } from '../types/evolution.type'
import Pokemons from '../models/pokemon.model'
import boom from '@hapi/boom'

class EvolutionService {
  // Método para crear una generación
  async create(evolution: Evolution) {
    const newEvolution = await Evolutions.create(evolution).catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!newEvolution) {
      throw boom.badRequest('Could not create evolution')
    }

    const basePokemonId = evolution.basePokemonId
    const evolvesToPokemonId = evolution.evolvesToPokemonId

    // Buscar pokemon base
    const basePokemon = await Pokemons.findById(basePokemonId)
    if (basePokemon) {
      if (!basePokemon.evolutions) basePokemon.evolutions = []
      basePokemon.evolutions.push(evolvesToPokemonId)
      await basePokemon.save()
    }

    // Buscar la evolucion
    const evolvedPokemon = await Pokemons.findById(evolvesToPokemonId)
    if (evolvedPokemon) {
      if (!evolvedPokemon.preEvolutions) evolvedPokemon.preEvolutions = []
      evolvedPokemon.preEvolutions.push(basePokemonId)
      await evolvedPokemon.save()
    }

    return newEvolution
  }

  // Método para encontrar todas las evoluciones
  async findAll() {
    const evolutions = await Evolutions.find()
      // .populate('basePokemonId evolvesToPokemonId')
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
        throw boom.badImplementation('Database connection error')
      })

    if (!evolutions || evolutions.length === 0) {
      throw boom.notFound('There are no evolutions')
    }

    return evolutions
  }

  // Método para buscar evolucion por ID
  async findById(id: string) {
    const evolution = await Evolutions.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!evolution) {
      throw boom.notFound('Evolution not found')
    }

    return evolution
  }

  // Método para buscar una evolucion por nivel (level)
  async findByLevel(level: number) {
    const levelData = await Evolutions.findOne({ level }).catch((error) => {
      console.log('Could not retrieve evolution info', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!levelData) {
      throw boom.notFound('Evolution not found')
    }

    return levelData
  }

  // Método para actualizar la evolucion por ID
  async updateById(id: string, updateData: Partial<Evolution>) {
    const updatedEvolution = await Evolutions.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true
      }
    ).catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!updatedEvolution) {
      throw boom.notFound('Evolution not found or could not be updated')
    }

    return updatedEvolution
  }

  // Método para eliminar una evolucion por ID
  async deleteById(id: string) {
    const deletedEvolution = await Evolutions.findByIdAndDelete(id).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
        throw boom.badImplementation('Database connection error')
      }
    )

    if (!deletedEvolution) {
      throw boom.notFound('Evolution not found or could not be deleted')
    }

    return deletedEvolution
  }
}

export default EvolutionService
