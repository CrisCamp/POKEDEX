// generation.service.ts

import Generations from '../models/generation.model'
import { Generation } from '../types/generation.type'
import boom from '@hapi/boom'

class GenerationService {
  // Método para crear una generación
  async create(generation: Generation) {
    const newGeneration = await Generations.create(generation).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
        throw boom.badImplementation('Database connection error')
      }
    )

    if (!newGeneration) {
      throw boom.badRequest('Could not create generation')
    }

    return newGeneration
  }

  // Método para encontrar todas las generaciones
  async findAll() {
    const generations = await Generations.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!generations || generations.length === 0) {
      throw boom.notFound('There are no generations')
    }

    return generations
  }

  // Método para buscar una generación por ID
  async findById(id: string) {
    const generation = await Generations.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!generation) {
      throw boom.notFound('Generation not found')
    }

    return generation
  }

  // Método para buscar una generación por número
  async findByGeneration(generation: number) {
    const generationData = await Generations.findOne({ generation }).catch(
      (error) => {
        console.log('Could not retrieve generation info', error)
        throw boom.badImplementation('Database connection error')
      }
    )

    if (!generationData) {
      throw boom.notFound('Generation not found')
    }

    return generationData
  }

  // Método para actualizar una generación por ID
  async updateById(id: string, updateData: Partial<Generation>) {
    const updatedGeneration = await Generations.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true
      }
    ).catch((error) => {
      console.log('Error while connecting to the DB', error)
      throw boom.badImplementation('Database connection error')
    })

    if (!updatedGeneration) {
      throw boom.notFound('Generation not found or could not be updated')
    }

    return updatedGeneration
  }

  // Método para eliminar una generación por ID
  async deleteById(id: string) {
    const deletedGeneration = await Generations.findByIdAndDelete(id).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
        throw boom.badImplementation('Database connection error')
      }
    )

    if (!deletedGeneration) {
      throw boom.notFound('Generation not found or could not be deleted')
    }

    return deletedGeneration
  }
}

export default GenerationService
