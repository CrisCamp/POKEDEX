//generation.service.ts

import Generations from '../models/generation.model'
import { Generation } from '../types/generation.type '
import boom from '@hapi/boom'

class GenerationService {
  // Metodo para crear una generación
  async create(generation: Generation) {
    const newGeneration = await Generations.create(generation).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
      }
    )

    //envio error en caso de no crear el generation
    if (!newGeneration) {
      throw boom.badRequest('Could not create generation')
    }

    return newGeneration
  }

  //Metodo para que encuentre todo
  async findAll() {
    const generations = await Generations.find().catch((error) => {
      // Ahora este error sería de mongo
      console.log('Error while connecting to the DB', error)
    })
    // Si no existen generations manda el error
    if (!generations) {
      throw boom.notFound('There are not generations')
    }
    return generations
  }

  // Metodo para buscar por id
  async findById(id: string) {
    const generation = await Generations.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!generation) {
      throw boom.notFound('Generation not found')
    }

    return generation
  }

  // Metodo para buscar por nombre de generación
  async findByGeneration(generation: number) {
    const generationData = await Generations.findOne({ generation }).catch(
      (error) => {
        console.log('Could not retrieve generation info', error)
      }
    )

    if (!generationData) {
      throw boom.notFound('Generation not found')
    }

    return generationData
  }
}

export default GenerationService
