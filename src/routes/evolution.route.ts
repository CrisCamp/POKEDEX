//evolution.route.ts

import express from 'express'
import { Evolution } from '../types/evolution.type'
import EvolutionService from '../services/evolution.service'
import passport from 'passport'
import { authorize } from '../middlewares/authorization'

const router = express.Router()
const service = new EvolutionService()

// Crear evolucion en la BD
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize(['admin']),
  async (req, res, next) => {
    try {
      const evolution: Evolution = req.body
      const newEvolution = await service.create(evolution)
      res.status(201).json({ evolution: newEvolution.toClient() })
    } catch (error) {
      next(error)
    }
  }
)

// Buscar todas las evoluciones
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize(['user', 'admin']),
  async (req, res, next) => {
    try {
      const evolutions = await service.findAll()
      res.status(200).json(evolutions.map((evo) => evo.toClient()))
    } catch (error) {
      next(error)
    }
  }
)

// Buscar por id
router.get(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['user', 'admin']),
  async (req, res, next) => {
    try {
      const evolution = await service.findById(req.params.id)
      res.status(200).json({ evolution: evolution.toClient() })
    } catch (error) {
      next(error)
    }
  }
)

// Buscar por nivel (level)
router.get(
  '/level/:level',
  passport.authenticate('jwt', { session: false }),
  authorize(['user', 'admin']),
  async (req, res, next) => {
    try {
      const level = await service.findByLevel(parseInt(req.params.level))
      res.status(200).json({ evolution: level.toClient() })
    } catch (error) {
      next(error)
    }
  }
)

// Actualizar evolucion por ID
router.put(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['admin']),
  async (req, res, next) => {
    try {
      const updateData: Partial<Evolution> = req.body
      const updatedEvolution = await service.updateById(
        req.params.id,
        updateData
      )
      res.status(200).json({ evolution: updatedEvolution.toClient() })
    } catch (error) {
      next(error)
    }
  }
)

// Eliminar evolucion por ID
router.delete(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['admin']),
  async (req, res, next) => {
    try {
      const deletedEvolution = await service.deleteById(req.params.id)
      res.status(200).json({
        message: 'Evolution deleted successfully',
        evolution: deletedEvolution.toClient()
      })
    } catch (error) {
      next(error)
    }
  }
)

export default router
