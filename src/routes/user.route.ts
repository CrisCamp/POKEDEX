// user.route.ts

// importo express
import express from 'express'
// importo los tipo user
import { User } from '../types/user.type'
// importo el servicio de user
import UserService from '../services/user.service'

const router = express.Router()
const service = new UserService()

// crear usuario en la BD
router.post('/', async (req, res, next) => {
  try {
    const user: User = req.body
    const newUser = await service.create(user)
    res.status(201).json({ user: newUser.toClient() })
  } catch (error) {
    next(error)
  }
})

// Buscar por todos los usuarios (no recomandable, solo para pruebas)
router.get('/', async (req, res, next) => {
  try {
    const user = await service.findAll()
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

// Buscar por email
router.get('/:email', async (req, res, next) => {
  try {
    const user = await service.findByEmail(req.params.email)
    res.status(200).json({ user: user.toClient() })
  } catch (error) {
    next(error)
  }
})

export default router
