//evolution.route.ts

import express from 'express'
import { Evolution } from '../types/evolution.type'
import EvolutionService from '../services/evolution.service'

const router = express.Router()
const service = new EvolutionService()

// crear evolucion en la BD
router.post('/', async (req, res, next) => {
  try {
    const evolution: Evolution = req.body
    const newEvolution = await service.create(evolution)
    console.log(newEvolution)
    res.status(201).json({ evolution: newEvolution.toClient() })
  } catch (error) {
    next(error)
  }
})

// Buscar todas las evoluciones
router.get('/', async (req, res, next) => {
  try {
    const evolutions = await service.findAll()
    res.status(200).json(evolutions)
  } catch (error) {
    next(error)
  }
})

// Buscar por id
router.get('/id/:id', async (req, res, next) => {
  try {
    const evolution = await service.findById(req.params.id)
    res.status(200).json({ evolution: evolution.toClient() })
  } catch (error) {
    next(error)
  }
})

// Buscar por nivel (level)
router.get('/level/:level', async (req, res, next) => {
  try {
    const level = await service.findByLevel(parseInt(req.params.level))
    res.status(200).json({ level: level.toClient() })
  } catch (error) {
    next(error)
  }
})

export default router
