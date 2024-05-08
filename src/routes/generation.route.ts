//generation.route.ts

import express from 'express'
import { Generation } from '../types/generation.type '
import GenerationService from '../services/generation.service'

const router = express.Router()
const service = new GenerationService()

// crear generación en la BD
router.post('/', async (req, res, next) => {
  try {
    const generation: Generation = req.body
    const newGeneration = await service.create(generation)
    console.log(newGeneration)
    res.status(201).json({ generation: newGeneration.toClient() })
  } catch (error) {
    next(error)
  }
})

// Buscar todas las generaciones
router.get('/', async (req, res, next) => {
  try {
    const generations = await service.findAll()
    res.status(200).json(generations)
  } catch (error) {
    next(error)
  }
})

// Buscar por id
router.get('/id/:id', async (req, res, next) => {
  try {
    const generation = await service.findById(req.params.id)
    res.status(200).json({ generation: generation.toClient() })
  } catch (error) {
    next(error)
  }
})

// Buscar por generation
router.get('/generation/:generation', async (req, res, next) => {
  try {
    const generation = await service.findByGeneration(
      parseInt(req.params.generation)
    )
    res.status(200).json({ generation: generation.toClient() })
  } catch (error) {
    next(error)
  }
})

export default router
